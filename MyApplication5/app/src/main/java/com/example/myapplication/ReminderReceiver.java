//package com.example.myapplication;
//
//import android.app.Notification;
//import android.app.NotificationChannel;
//import android.app.NotificationManager;
//import android.content.BroadcastReceiver;
//import android.content.Context;
//import android.content.Intent;
//
//import androidx.core.app.NotificationCompat;
//
//public class ReminderReceiver extends BroadcastReceiver {
//    @Override
//    public void onReceive(Context context, Intent intent) {
//        String channelId = "GYM_REMINDER_CHANNEL";
//        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
//
//        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
//            NotificationChannel channel = new NotificationChannel(channelId, "GYM Reminder", NotificationManager.IMPORTANCE_HIGH);
//            manager.createNotificationChannel(channel);
//        }
//
//        Notification notification = new NotificationCompat.Builder(context, channelId)
//                .setContentTitle("GYM Reminder")
//                .setContentText("Time for your workout! Let's go!")
//                .setSmallIcon(android.R.drawable.ic_dialog_info)
//                .build();
//
//        manager.notify(1, notification);
//    }
//}
package com.example.myapplication;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.core.app.NotificationCompat;

public class ReminderReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        // Show Notification
        String channelId = "reminder_channel";
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        // Create channel for Android 8+
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(channelId, "Reminders", NotificationManager.IMPORTANCE_HIGH);
            notificationManager.createNotificationChannel(channel);
        }

        Intent i = new Intent(context, ReminderActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, i, PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, channelId)
                .setContentTitle("Reminder")
                .setContentText("It's time for your reminder!")
                .setSmallIcon(R.drawable.ic_launcher_foreground)
                .setContentIntent(pendingIntent)
                .setAutoCancel(true);

        notificationManager.notify(100, builder.build());
    }
}