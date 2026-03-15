package com.example.myapplication;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

public class ProgressActivity extends AppCompatActivity {

    Button btnWeightProgress, btnWorkoutProgress, btnDietProgress, btnAddWeight;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_progress);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        btnWeightProgress = findViewById(R.id.btnWeightProgress);
        btnWorkoutProgress = findViewById(R.id.btnWorkoutProgress);
        btnDietProgress = findViewById(R.id.btnDietProgress);
        btnAddWeight = findViewById(R.id.btnAddWeight);

        btnWeightProgress.setOnClickListener(v -> showProgressDialog("Weight Progress", new String[]{
                "Initial Weight: 70kg",
                "Current Weight: 75kg",
                "Goal Weight: 80kg"
        }));

        btnWorkoutProgress.setOnClickListener(v -> showProgressDialog("Workout Progress", new String[]{
                "Started with 30 min/day",
                "Now doing 60 min/day",
                "Goal: 90 min/day"
        }));

        btnDietProgress.setOnClickListener(v -> showProgressDialog("Diet Progress", new String[]{
                "Started High Calorie Diet",
                "Maintaining Protein Intake",
                "Tracking Calories Daily"
        }));

        btnAddWeight.setOnClickListener(v -> showWeightInputDialog());
    }

    private void showProgressDialog(String title, String[] progressInfo) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(title);

        StringBuilder message = new StringBuilder();
        for (String item : progressInfo) {
            message.append("• ").append(item).append("\n");
        }

        builder.setMessage(message.toString());
        builder.setPositiveButton("OK", (dialog, which) -> dialog.dismiss());
        builder.show();
    }

    private void showWeightInputDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Enter Your Current Weight (kg)");

        final EditText input = new EditText(this);
        input.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
        builder.setView(input);

        builder.setPositiveButton("OK", (dialog, which) -> {
            String weightStr = input.getText().toString();
            if (!weightStr.isEmpty()) {
                int weight = Integer.parseInt(weightStr);
                showBMICategory(weight);
            }
        });

        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());
        builder.show();
    }

    private void showBMICategory(int weight) {
        String message;
        if (weight < 60) {
            message = "Category: Underweight\nAdvice: Increase Calorie Intake";
        } else if (weight <= 75) {
            message = "Category: Healthy Weight\nAdvice: Maintain Balanced Diet";
        } else {
            message = "Category: Overweight\nAdvice: Focus on Weight Loss Workouts";
        }

        new AlertDialog.Builder(this)
                .setTitle("Your Weight Category")
                .setMessage(message)
                .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                .show();
    }
}////package com.example.gymapp;
////
////public class ProgressActivity {
////}
////package com.example.gymapp;
////
////import android.os.Bundle;
////import androidx.appcompat.app.AppCompatActivity;
////
////public class ProgressActivity extends AppCompatActivity {
////    @Override
////    protected void onCreate(Bundle savedInstanceState) {
////        super.onCreate(savedInstanceState);
////        setContentView(R.layout.activity_progress);
////    }
////}
//package com.example.myapplication;
//
//import android.os.Bundle;
//import android.widget.ArrayAdapter;
//import android.widget.ListView;
//
//import androidx.appcompat.app.AppCompatActivity;
//
//public class ProgressActivity extends AppCompatActivity {
//
//    ListView listProgress;
//    String[] progressData = {
//            "Week 1: Weight - 74 kg",
//            "Week 2: Weight - 73 kg",
//            "Week 3: Weight - 72.5 kg",
//            "Week 4: Weight - 72 kg",
//            "Chest: +1 inch | Arms: +0.5 inch",
//            "Strength Improved: Bench Press +5 kg"
//    };
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_progress);
//
//        listProgress = findViewById(R.id.listProgress);
//
//        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, progressData);
//        listProgress.setAdapter(adapter);
//    }
//}