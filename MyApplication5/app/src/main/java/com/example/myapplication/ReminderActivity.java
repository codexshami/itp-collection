//package com.example.myapplication;
//
//import android.app.AlarmManager;
//import android.app.PendingIntent;
//import android.content.Intent;
//import android.os.Bundle;
//import android.widget.Button;
//import android.widget.TimePicker;
//import android.widget.Toast;
//
//import androidx.appcompat.app.AppCompatActivity;
//
//import java.util.Calendar;
//
//public class ReminderActivity extends AppCompatActivity {
//
//    TimePicker timePicker;
//    Button btnSetReminder;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_reminder);
//
//        timePicker = findViewById(R.id.timePicker);
//        btnSetReminder = findViewById(R.id.btnSetReminder);
//
//        btnSetReminder.setOnClickListener(v -> {
//            int hour = timePicker.getHour();
//            int minute = timePicker.getMinute();
//
//            Calendar calendar = Calendar.getInstance();
//            calendar.set(Calendar.HOUR_OF_DAY, hour);
//            calendar.set(Calendar.MINUTE, minute);
//            calendar.set(Calendar.SECOND, 0);
//
//            AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);
//            Intent intent = new Intent(this, ReminderReceiver.class);
//            PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_IMMUTABLE);
//
//            alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(),
//                    AlarmManager.INTERVAL_DAY, pendingIntent);
//
//            Toast.makeText(this, "Daily Reminder Set!", Toast.LENGTH_SHORT).show();
//        });
//    }
//}
//package com.example.myapplication;
//
//import android.app.AlarmManager;
//import android.app.PendingIntent;
//import android.content.Intent;
//import android.os.Bundle;
//import android.widget.Button;
//import android.widget.TimePicker;
//import android.widget.Toast;
//
//import androidx.appcompat.app.AppCompatActivity;
//
//import java.util.Calendar;
//
//public class ReminderActivity extends AppCompatActivity {
//
//    TimePicker timePicker;
//    Button btnSetReminder;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_reminder);
//
//        timePicker = findViewById(R.id.timePicker);
//        btnSetReminder = findViewById(R.id.btnSetReminder);
//
//        btnSetReminder.setOnClickListener(v -> {
//            int hour = timePicker.getHour();
//            int minute = timePicker.getMinute();
//
//            Calendar calendar = Calendar.getInstance();
//            calendar.set(Calendar.HOUR_OF_DAY, hour);
//            calendar.set(Calendar.MINUTE, minute);
//            calendar.set(Calendar.SECOND, 0);
//
//            if (calendar.before(Calendar.getInstance())) {
//                calendar.add(Calendar.DATE, 1); // Set for next day if time passed
//            }
//
//            AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);
//            Intent intent = new Intent(this, ReminderReceiver.class);
//            PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_IMMUTABLE);
//
//            alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
//
//            Toast.makeText(this, "Reminder Set!", Toast.LENGTH_SHORT).show();
//        });
//    }
//}
package com.example.myapplication;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.widget.Button;
import android.widget.TimePicker;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.Calendar;

public class ReminderActivity extends AppCompatActivity {

    TimePicker timePicker;
    Button btnSetReminder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reminder);

        timePicker = findViewById(R.id.timePicker);
        btnSetReminder = findViewById(R.id.btnSetReminder);

        btnSetReminder.setOnClickListener(v -> setAlarmWithCheck());
    }

    private void setAlarmWithCheck() {
        int hour = timePicker.getHour();
        int minute = timePicker.getMinute();

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, 0);

        if (calendar.before(Calendar.getInstance())) {
            calendar.add(Calendar.DATE, 1);
        }

        AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);
        Intent intent = new Intent(this, ReminderReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_IMMUTABLE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (!alarmManager.canScheduleExactAlarms()) {
                Toast.makeText(this, "Permission needed for exact alarms", Toast.LENGTH_LONG).show();
                // Open Settings so user can allow it
                Intent settingsIntent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
                startActivity(settingsIntent);
                return;
            }
        }

        try {
            alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
            Toast.makeText(this, "Reminder Set Successfully!", Toast.LENGTH_SHORT).show();
        } catch (SecurityException e) {
            Toast.makeText(this, "Exact alarm permission denied.", Toast.LENGTH_SHORT).show();
        }
    }
}
