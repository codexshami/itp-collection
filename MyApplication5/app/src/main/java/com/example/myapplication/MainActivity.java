//package com.example.myapplication;
//
//import android.content.Intent;
//import android.os.Bundle;
//
//import androidx.activity.EdgeToEdge;
//import androidx.appcompat.app.AppCompatActivity;
//import androidx.core.graphics.Insets;
//import androidx.core.view.ViewCompat;
//import androidx.core.view.WindowInsetsCompat;
//
//import com.google.android.material.bottomnavigation.BottomNavigationView;
//
//public class MainActivity extends AppCompatActivity {
//    BottomNavigationView bottomNavigation;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
//
//        bottomNavigation = findViewById(R.id.bottomNavigationView);
//
////
//        bottomNavigation.setOnItemSelectedListener(item -> {
//            int id = item.getItemId();
//
//            if (id == R.id.nav_home) {
//                startActivity(new Intent(MainActivity.this,LoginActivity.class));
//                // You are already in Home
//                return true;
//            } else if (id == R.id.nav_fitness) {
//                startActivity(new Intent(MainActivity.this, FitnessActivity.class));
//                return true;
//            } else if (id == R.id.nav_diet) {
//                startActivity(new Intent(MainActivity.this, DietActivity.class));
//                return true;
//            } else if (id == R.id.nav_progress) {
//                startActivity(new Intent(MainActivity.this, ProgressActivity.class));
//                return true;
//            } else if (id == R.layout.activity_reminder){
//                startActivity(new Intent(MainActivity.this,ReminderActivity.class));
//                return true;
//            } else{
//                return false;
//            }
//
//        });
//    }
//}
package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainActivity extends AppCompatActivity {

    BottomNavigationView bottomNavigationView;
    Button btnLogout;
    TextView tvWelcome;
    SharedPreferences sharedPreferences;
    public static final String PREFS_NAME = "loginPrefs";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);  // Make sure you have updated layout

        bottomNavigationView = findViewById(R.id.bottomNavigationView);
        btnLogout = findViewById(R.id.btnLogout);
        tvWelcome = findViewById(R.id.tvWelcome);
        sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        bottomNavigationView.setOnNavigationItemSelectedListener(item -> {
            int id = item.getItemId();
            if (id == R.id.nav_home) {
                // Already in Home
                return true;
            } else if (id == R.id.nav_fitness) {
                startActivity(new Intent(MainActivity.this, FitnessActivity.class));
                return true;
            } else if (id == R.id.nav_diet) {
                startActivity(new Intent(MainActivity.this, DietActivity.class));
                return true;
            } else if (id == R.id.nav_progress) {
                startActivity(new Intent(MainActivity.this, ProgressActivity.class));
                return true;
            } else if (id == R.layout.activity_reminder) {
                startActivity(new Intent(MainActivity.this, ReminderActivity.class));
                return true;
            }
            return false;
        });

        btnLogout.setOnClickListener(v -> {
            sharedPreferences.edit().putBoolean("remember", false).apply();
            startActivity(new Intent(MainActivity.this, LoginActivity.class));
            finish();
        });
    }
}