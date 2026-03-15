//package com.example.myapplication;
//
//import android.os.Bundle;
//import android.view.View;
//import android.widget.Button;
//import androidx.appcompat.app.AlertDialog;
//import androidx.appcompat.app.AppCompatActivity;
//
//public class FitnessActivity extends AppCompatActivity {
//
//    Button btnChest, btnBack, btnShoulder, btnBicep, btnTricep, btnLegs;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_fitness);
//
//        btnChest = findViewById(R.id.btnChest);
//        btnBack = findViewById(R.id.btnBack);
//        btnShoulder = findViewById(R.id.btnShoulder);
//        btnBicep = findViewById(R.id.btnBicep);
//        btnTricep = findViewById(R.id.btnTricep);
//        btnLegs = findViewById(R.id.btnLegs);
//
//        btnChest.setOnClickListener(view -> showDialog("Chest Exercises",
//                "Bench Press\nIncline Dumbbell Press\nChest Fly\nPush-Ups"));
//
//        btnBack.setOnClickListener(view -> showDialog("Back Exercises",
//                "Deadlift\nPull-Ups\nBent Over Row\nLat Pulldown"));
//
//        btnShoulder.setOnClickListener(view -> showDialog("Shoulder Exercises",
//                "Overhead Press\nLateral Raise\nFront Raise\nShrugs"));
//
//        btnBicep.setOnClickListener(view -> showDialog("Bicep Exercises",
//                "Barbell Curl\nHammer Curl\nConcentration Curl\nPreacher Curl"));
//
//        btnTricep.setOnClickListener(view -> showDialog("Tricep Exercises",
//                "Tricep Dips\nSkull Crushers\nOverhead Tricep Extension\nTricep Pushdown"));
//
//        btnLegs.setOnClickListener(view -> showDialog("Leg Exercises",
//                "Squats\nLunges\nLeg Press\nHamstring Curl\nCalf Raises"));
//    }
//
//    private void showDialog(String title, String message) {
//        new AlertDialog.Builder(this)
//                .setTitle(title)
//                .setMessage(message)
//                .setPositiveButton("Close", null)
//                .show();
//    }
//}
package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

public class FitnessActivity extends AppCompatActivity {

    Button btnChest, btnBack, btnShoulder, btnBicep, btnTricep, btnLegs,fit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fitness);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        btnChest = findViewById(R.id.btnChest);
        btnBack = findViewById(R.id.btnBack);
        btnShoulder = findViewById(R.id.btnShoulder);
        btnBicep = findViewById(R.id.btnBicep);
        btnTricep = findViewById(R.id.btnTricep);
        btnLegs = findViewById(R.id.btnLegs);
        fit=findViewById(R.id.btnfit);

        btnChest.setOnClickListener(v -> showExerciseDialog("Chest", new String[]{
                "Bench Press", "Incline Dumbbell Press", "Push-Ups", "Cable Fly"
        }));

        btnBack.setOnClickListener(v -> showExerciseDialog("Back", new String[]{
                "Pull-Ups", "Deadlift", "Lat Pulldown", "Seated Row"
        }));

        btnShoulder.setOnClickListener(v -> showExerciseDialog("Shoulder", new String[]{
                "Overhead Press", "Lateral Raise", "Front Raise", "Shrugs"
        }));

        btnBicep.setOnClickListener(v -> showExerciseDialog("Bicep", new String[]{
                "Barbell Curl", "Dumbbell Curl", "Hammer Curl", "Concentration Curl"
        }));

        btnTricep.setOnClickListener(v -> showExerciseDialog("Tricep", new String[]{
                "Tricep Dips", "Overhead Extension", "Tricep Pushdown", "Close-Grip Bench Press"
        }));

        btnLegs.setOnClickListener(v -> showExerciseDialog("Legs", new String[]{
                "Squats", "Lunges", "Leg Press", "Deadlifts"
        }));
        fit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i=new Intent(FitnessActivity.this, ReminderActivity.class);
                startActivity(i);
            }
        });
    }

    private void showExerciseDialog(String title, String[] exercises) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(title + " Exercises");

        StringBuilder message = new StringBuilder();
        for (String exercise : exercises) {
            message.append("• ").append(exercise).append("\n");
        }

        builder.setMessage(message.toString());
        builder.setPositiveButton("OK", (dialog, which) -> dialog.dismiss());
        builder.show();
    }
}