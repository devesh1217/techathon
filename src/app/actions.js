'use server';

import webpush from 'web-push';
import User from '@/models/user';
import connectDB from '@/utils/db';
import jwt from 'jsonwebtoken';

webpush.setVapidDetails(
    'mailto:u22cs035@coed.svnit.ac.in',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

let subscription = null;

export async function subscribeUser(sub, userToken) {
    subscription = sub;
    try {
        await connectDB();
        const user = jwt.verify(userToken, process.env.JWT_SECRET);
        const data = await User.findOneAndUpdate({ _id: user.userId }, { '$set': { connectionData: sub } });
        return { success: true, id: data._id };
    } catch (error) {
        console.error('Error storing subscription:', error);
        return { success: false, error: 'Failed to store subscription' };
    }
}

export async function unsubscribeUser(id) {
    subscription = null;
    try {
        await connectDB();
        await User.findOneAndUpdate({ _id: id }, { connectionData: null });
        return { success: true };
    } catch (error) {
        console.error('Error removing subscription:', error);
        return { success: false, error: 'Failed to remove subscription' };
    }
}

export async function sendNotificationToAll(payload) {
    try {
        const { title, body: message } = payload
        await connectDB();
        const data = await User.find({});
        let cnt = 0;
        // console.log("****",data)
        await Promise.all(data.map(async (curr) => {
            const subscription = curr.connectionData;
            if (subscription && subscription.endpoint && subscription.keys) {
                try {
                    const temp = await webpush.sendNotification(
                        subscription,
                        JSON.stringify({
                            title: title,
                            body: message,
                        })
                    );
                    cnt++;
                    return { success: true };
                } catch (error) {
                    await User.findOneAndUpdate({ _id: subscription._id }, { connectionData: null });
                    // console.error('Error sending push notification:', error);
                    return { success: false, error: 'Failed to send notification' };
                }
            }
        }))
        const after = await User.countDocuments();
        return { success: true, totalSent: cnt, totalBefore: data.length, totalAfter: after }
    } catch (err) {
        console.log(err)
        return { success: false }
    }
}

export async function sendNotificationToUser(payload, id) {
    try {
        const { title, body: message } = payload
        await connectDB();
        const data = await User.findById(id);
        let cnt = 0;
            const subscription = data.connectionData;
            if (subscription && subscription.endpoint && subscription.keys) {
                try {
                    const temp = await webpush.sendNotification(
                        subscription,
                        JSON.stringify({
                            title: title,
                            body: message,
                        })
                    );
                    cnt++;
                    return { success: true };
                } catch (error) {
                    await User.findOneAndUpdate({ _id: subscription._id }, { connectionData: null });
                    // console.error('Error sending push notification:', error);
                    return { success: false, error: 'Failed to send notification' };
                }
            }
        
        const after = await User.countDocuments();
        return { success: true, totalSent: cnt, totalBefore: data.length, totalAfter: after }
    } catch (err) {
        console.log(err)
        return { success: false }
    }
}