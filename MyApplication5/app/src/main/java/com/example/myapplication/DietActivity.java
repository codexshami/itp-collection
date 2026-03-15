//////package com.example.gymapp;
//////
//////public class DietActivity {
//////}
//////package com.example.gymapp;
//////
//////import android.os.Bundle;
//////import androidx.appcompat.app.AppCompatActivity;
//////
//////public class DietActivity extends AppCompatActivity {
//////    @Override
//////    protected void onCreate(Bundle savedInstanceState) {
//////        super.onCreate(savedInstanceState);
//////        setContentView(R.layout.activity_diet);
//////    }
//////}
////package com.example.myapplication;
////
////import android.os.Bundle;
////import android.widget.ArrayAdapter;
////import android.widget.ListView;
////
////import androidx.appcompat.app.AppCompatActivity;
////
////public class DietActivity extends AppCompatActivity {
////
////    ListView listDiet;
////    String[] dietPlan = {
////            "Breakfast: Oats + Boiled Eggs",
////            "Mid-Morning Snack: Fruits + Nuts",
////            "Lunch: Brown Rice + Grilled Chicken + Veggies",
////            "Evening Snack: Protein Shake + Banana",
////            "Dinner: Quinoa + Paneer + Salad",
////            "Water Intake: 3-4 Litres Daily"
////    };
////
////    @Override
////    protected void onCreate(Bundle savedInstanceState) {
////        super.onCreate(savedInstanceState);
////        setContentView(R.layout.activity_diet);
////
////        listDiet = findViewById(R.id.listDiet);
////
////        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, dietPlan);
////        listDiet.setAdapter(adapter);
////    }
////}
//package com.example.myapplication;
//
//import static com.example.myapplication.R.id.btnShowDiet;
//import static com.example.myapplication.R.id.edtWeight;
//
//import android.os.Bundle;
//import android.widget.Button;
//import android.widget.EditText;
//import androidx.appcompat.app.AlertDialog;
//import androidx.appcompat.app.AppCompatActivity;
//
//public class DietActivity extends AppCompatActivity {
//
//    EditText edtWeight;
//    Button btnShowDiet;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_diet);
//
//        edtWeight = findViewById(R.id.edtWeight);
//        btnShowDiet = findViewById(R.id.btnShowDiet);
//
//        btnShowDiet.setOnClickListener(view -> {
//            String weightStr = edtWeight.getText().toString().trim();
//
//            if (weightStr.isEmpty()) {
//                showDialog("Error", "Please enter your weight");
//                return;
//            }
//
//            int weight = Integer.parseInt(weightStr);
//
//            if (weight < 50) {
//                showDialog("Diet Plan for Under 50kg",
//                        "• High-protein diet\n• Eggs, Paneer, Chicken\n• Rice, Roti, Vegetables\n• Fruits & Nuts\n• Protein Shakes");
//            } else if (weight <= 70) {
//                showDialog("Diet Plan for 50-70kg",
//                        "• Balanced diet with protein\n• Eggs, Chicken, Dal\n• Rice, Roti, Salad\n• Green Vegetables, Fruits\n• 2-3 Litres Water");
//            } else {
//                showDialog("Diet Plan for Above 70kg",
//                        "• Focus on High-Protein, Low-Carb\n• Boiled Eggs, Grilled Chicken, Paneer\n• Oats, Brown Rice\n• Salads, Fruits\n• Avoid Junk Food");
//            }
//        });
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
//package com.example.myapplication;
//
//import android.os.Bundle;
//import android.widget.Button;
//import androidx.appcompat.app.AlertDialog;
//import androidx.appcompat.app.AppCompatActivity;
//import androidx.appcompat.widget.Toolbar;
//
//public class DietActivity extends AppCompatActivity {
//
//    Button btnWeightGain, btnWeightLoss, btnMaintenance;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_diet);
//
//        Toolbar toolbar = findViewById(R.id.toolbar);
//        setSupportActionBar(toolbar);
//
//        btnWeightGain = findViewById(R.id.btnWeightGain);
//        btnWeightLoss = findViewById(R.id.btnWeightLoss);
//        btnMaintenance = findViewById(R.id.btnMaintenance);
//
//        btnWeightGain.setOnClickListener(v -> showDietDialog("Weight Gain Diet", new String[]{
//                "Breakfast: Oats + Eggs + Peanut Butter",
//                "Lunch: Rice + Chicken Breast + Veggies",
//                "Snack: Banana + Nuts + Protein Shake",
//                "Dinner: Roti + Paneer/Tofu + Salad"
//        }));
//
//        btnWeightLoss.setOnClickListener(v -> showDietDialog("Weight Loss Diet", new String[]{
//                "Breakfast: Oats + Boiled Eggs",
//                "Lunch: Brown Rice + Grilled Chicken + Veggies",
//                "Snack: Green Tea + Nuts",
//                "Dinner: Salad + Grilled Fish/Chicken"
//        }));
//
//        btnMaintenance.setOnClickListener(v -> showDietDialog("Maintenance Diet", new String[]{
//                "Balanced Breakfast: Oats + Milk + Fruits",
//                "Lunch: Rice/Roti + Chicken/Paneer + Salad",
//                "Snack: Protein Bar/Shake",
//                "Dinner: Light Meal + Veggies"
//        }));
//    }
//
//    private void showDietDialog(String title, String[] dietPlan) {
//        AlertDialog.Builder builder = new AlertDialog.Builder(this);
//        builder.setTitle(title);
//
//        StringBuilder message = new StringBuilder();
//        for (String item : dietPlan) {
//            message.append("• ").append(item).append("\n");
//        }
//
//        builder.setMessage(message.toString());
//        builder.setPositiveButton("OK", (dialog, which) -> dialog.dismiss());
//        builder.show();
//    }
//}
package com.example.myapplication;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

public class DietActivity extends AppCompatActivity {

    Button btnWeightGain, btnWeightLoss, btnMaintenance, btnCustomDiet;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_diet);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        btnWeightGain = findViewById(R.id.btnWeightGain);
        btnWeightLoss = findViewById(R.id.btnWeightLoss);
        btnMaintenance = findViewById(R.id.btnMaintenance);
        btnCustomDiet = findViewById(R.id.btnCustomDiet);

        btnWeightGain.setOnClickListener(v -> showDietDialog("Weight Gain Diet", new String[]{
                "Breakfast: Oats + Eggs + Peanut Butter",
                "Lunch: Rice + Chicken Breast + Veggies",
                "Snack: Banana + Nuts + Protein Shake",
                "Dinner: Roti + Paneer/Tofu + Salad"
        }));

        btnWeightLoss.setOnClickListener(v -> showDietDialog("Weight Loss Diet", new String[]{
                "Breakfast: Oats + Boiled Eggs",
                "Lunch: Brown Rice + Grilled Chicken + Veggies",
                "Snack: Green Tea + Nuts",
                "Dinner: Salad + Grilled Fish/Chicken"
        }));

        btnMaintenance.setOnClickListener(v -> showDietDialog("Maintenance Diet", new String[]{
                "Balanced Breakfast: Oats + Milk + Fruits",
                "Lunch: Rice/Roti + Chicken/Paneer + Salad",
                "Snack: Protein Bar/Shake",
                "Dinner: Light Meal + Veggies"
        }));

        btnCustomDiet.setOnClickListener(v -> showWeightInputDialog());
    }

    private void showDietDialog(String title, String[] dietPlan) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(title);

        StringBuilder message = new StringBuilder();
        for (String item : dietPlan) {
            message.append("• ").append(item).append("\n");
        }

        builder.setMessage(message.toString());
        builder.setPositiveButton("OK", (dialog, which) -> dialog.dismiss());
        builder.show();
    }

    private void showWeightInputDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Enter Your Weight (kg)");

        final EditText input = new EditText(this);
        input.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
        builder.setView(input);

        builder.setPositiveButton("OK", (dialog, which) -> {
            String weightStr = input.getText().toString();
            if (!weightStr.isEmpty()) {
                int weight = Integer.parseInt(weightStr);
                suggestDietBasedOnWeight(weight);
            }
        });

        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());
        builder.show();
    }

    private void suggestDietBasedOnWeight(int weight) {
        String title;
        String[] dietPlan;

        if (weight < 60) {
            title = "Underweight - Weight Gain Diet";
            dietPlan = new String[]{
                    "High Protein Breakfast",
                    "Rice + Chicken + Salad for Lunch",
                    "Nuts + Milkshake in Evening",
                    "Roti + Paneer + Veggies at Dinner"
            };
        } else if (weight <= 75) {
            title = "Normal Weight - Maintenance Diet";
            dietPlan = new String[]{
                    "Balanced Breakfast with Oats & Fruits",
                    "Grilled Chicken + Rice + Salad for Lunch",
                    "Protein Shake + Nuts in Evening",
                    "Roti + Veggies + Light Dinner"
            };
        } else {
            title = "Overweight - Weight Loss Diet";
            dietPlan = new String[]{
                    "Low Calorie Breakfast with Eggs & Oats",
                    "Grilled Fish/Chicken + Veggies for Lunch",
                    "Green Tea + Nuts for Snack",
                    "Salad + Light Dinner"
            };
        }

        showDietDialog(title, dietPlan);
    }
}