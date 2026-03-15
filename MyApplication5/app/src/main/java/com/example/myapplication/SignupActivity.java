//package com.example.myapplication;
//
//public class SignupActivity {
//}
//package com.example.myapplication;
//
//import android.content.Context;
//import android.content.Intent;
//import android.content.SharedPreferences;
//import android.os.Bundle;
//import android.widget.*;
//import androidx.appcompat.app.AppCompatActivity;
//
//public class SignupActivity extends AppCompatActivity {
//
//    EditText etNewUser, etNewPass;
//    Button btnRegister;
//    SharedPreferences sharedPreferences;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_signup);
//
//        etNewUser = findViewById(R.id.etNewUser);
//        etNewPass = findViewById(R.id.etNewPass);
//        btnRegister = findViewById(R.id.btnRegister);
//
//        sharedPreferences = getSharedPreferences(LoginActivity.PREFS_NAME, Context.MODE_PRIVATE);
//
//        btnRegister.setOnClickListener(v -> {
//            String username = etNewUser.getText().toString();
//            String password = etNewPass.getText().toString();
//
//            if (!username.isEmpty() && !password.isEmpty()) {
//                sharedPreferences.edit()
//                        .putString("user", username)
//                        .putString("pass", password)
//                        .apply();
//
//                Toast.makeText(this, "Registered Successfully!", Toast.LENGTH_SHORT).show();
//                startActivity(new Intent(this, LoginActivity.class));
//                finish();
//            } else {
//                Toast.makeText(this, "Fields cannot be empty!", Toast.LENGTH_SHORT).show();
//            }
//        });
//    }
//}

package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.*;

import androidx.appcompat.app.AppCompatActivity;

public class SignupActivity extends AppCompatActivity {

    EditText etNewUser, etNewPass;
    Button btnRegister;
    SharedPreferences sharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        etNewUser = findViewById(R.id.etNewUser);
        etNewPass = findViewById(R.id.etNewPass);
        btnRegister = findViewById(R.id.btnRegister);

        sharedPreferences = getSharedPreferences(LoginActivity.PREFS_NAME, Context.MODE_PRIVATE);

        btnRegister.setOnClickListener(v -> {
            String username = etNewUser.getText().toString();
            String password = etNewPass.getText().toString();

            if (!username.isEmpty() && !password.isEmpty()) {
                sharedPreferences.edit()
                        .putString("user", username)
                        .putString("pass", password)
                        .apply();

                Toast.makeText(this, "Registered Successfully!", Toast.LENGTH_SHORT).show();
                startActivity(new Intent(this, LoginActivity.class));
                finish();
            } else {
                Toast.makeText(this, "Fields cannot be empty!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}

