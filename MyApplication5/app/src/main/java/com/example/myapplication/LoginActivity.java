//package com.example.myapplication;
//
//import android.content.Intent;
//import android.content.SharedPreferences;
//import android.os.Bundle;
//import android.widget.Button;
//import android.widget.EditText;
//
//import androidx.appcompat.app.AppCompatActivity;
//
//public class LoginActivity extends AppCompatActivity {
//
//    EditText editName;
//    Button btnLogin;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//
//        SharedPreferences prefs = getSharedPreferences("GymAppPrefs", MODE_PRIVATE);
//        if (prefs.contains("username")) {
//            startActivity(new Intent(this, MainActivity.class));
//            finish();
//        }
//
//        setContentView(R.layout.activity_login);
//
//        editName = findViewById(R.id.editName);
//        btnLogin = findViewById(R.id.btnLogin);
//
//        btnLogin.setOnClickListener(v -> {
//            String name = editName.getText().toString();
//            if (!name.isEmpty()) {
//                prefs.edit().putString("username", name).apply();
//                startActivity(new Intent(this, MainActivity.class));
//                finish();
//            } else {
//                editName.setError("Enter your name");
//            }
//        });
//    }
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
//public class LoginActivity extends AppCompatActivity {
//
//    EditText etUsername, etPassword;
//    Button btnLogin;
//    CheckBox cbRemember;
//    TextView tvSignup;
//    SharedPreferences sharedPreferences;
//    public static final String PREFS_NAME = "loginPrefs";
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_login);
//
//        etUsername = findViewById(R.id.etUsername);
//        etPassword = findViewById(R.id.etPassword);
//        btnLogin = findViewById(R.id.btnLogin);
//        cbRemember = findViewById(R.id.cbRemember);
//        tvSignup = findViewById(R.id.tvSignup);
//
//        sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
//
//        if (sharedPreferences.getBoolean("remember", false)) {
//            startActivity(new Intent(this, MainActivity.class));
//            finish();
//        }
//
//        btnLogin.setOnClickListener(v -> {
//            String username = etUsername.getText().toString();
//            String password = etPassword.getText().toString();
//
//            String savedUser = sharedPreferences.getString("user", "");
//            String savedPass = sharedPreferences.getString("pass", "");
//
//            if (username.equals(savedUser) && password.equals(savedPass)) {
//                if (cbRemember.isChecked()) {
//                    sharedPreferences.edit().putBoolean("remember", true).apply();
//                }
//                startActivity(new Intent(this, MainActivity.class));
//                finish();
//            } else {
//                Toast.makeText(this, "Invalid Credentials!", Toast.LENGTH_SHORT).show();
//            }
//        });
//
//        tvSignup.setOnClickListener(v -> startActivity(new Intent(this, SignupActivity.class)));
//    }
//}
//package com.example.myapplication;
//
//import android.content.Context;
//import android.content.Intent;
//import android.content.SharedPreferences;
//import android.os.Bundle;
//import android.widget.Button;
//import android.widget.CheckBox;
//import android.widget.EditText;
//import android.widget.Toast;
//import androidx.appcompat.app.AppCompatActivity;
//
//public class LoginActivity extends AppCompatActivity {
//
//    EditText edtUsername, edtPassword;
//    Button btnLogin;
//    CheckBox chkRemember;
//    SharedPreferences sharedPreferences;
//    public static final String PREFS_NAME = "loginPrefs";
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_login);
//
//        edtUsername = findViewById(R.id.edtUsername);
//        edtPassword = findViewById(R.id.edtPassword);
//        btnLogin = findViewById(R.id.btnLogin);
//        chkRemember = findViewById(R.id.chkRemember);
//
//        sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
//
//        // Auto Login if Remember Me is checked
//        if (sharedPreferences.getBoolean("remember", false)) {
//            startActivity(new Intent(LoginActivity.this, MainActivity.class));
//            finish();
//        }
//
//        btnLogin.setOnClickListener(v -> {
//            String username = edtUsername.getText().toString();
//            String password = edtPassword.getText().toString();
//
//            if (username.equals("user") && password.equals("1234")) {
//                if (chkRemember.isChecked()) {
//                    sharedPreferences.edit().putBoolean("remember", true).apply();
//                }
//                startActivity(new Intent(LoginActivity.this, MainActivity.class));
//                finish();
//            } else {
//                Toast.makeText(this, "Invalid Username or Password", Toast.LENGTH_SHORT).show();
//            }
//        });
//    }
//}
//package com.example.myapplication;
//
//import android.content.Context;
//import android.content.Intent;
//import android.content.SharedPreferences;
//import android.os.Bundle;
//import android.widget.Button;
//import android.widget.CheckBox;
//import android.widget.EditText;
//import androidx.appcompat.app.AppCompatActivity;
//
//public class LoginActivity extends AppCompatActivity {
//
//    EditText edtUsername, edtPassword;
//    Button btnLogin;
//    CheckBox chkRemember;
//    SharedPreferences sharedPreferences;
//    public static final String PREFS_NAME = "loginPrefs";
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_login);
//
//        edtUsername = findViewById(R.id.edtUsername);
//        edtPassword = findViewById(R.id.edtPassword);
//        btnLogin = findViewById(R.id.btnLogin);
//        chkRemember = findViewById(R.id.chkRemember);
//
//        sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
//
//        // Auto Login if Remember Me is checked
//        if (sharedPreferences.getBoolean("remember", false)) {
//            startActivity(new Intent(LoginActivity.this, MainActivity.class));
//            finish();
//        }
//
//        btnLogin.setOnClickListener(v -> {
//            // Accept any username/password
//            if (chkRemember.isChecked()) {
//                sharedPreferences.edit().putBoolean("remember", true).apply();
//            }
//            startActivity(new Intent(LoginActivity.this, MainActivity.class));
//            finish();
//        });
//    }
//}
// second main
//package com.example.myapplication;
//
//import android.content.Context;
//import android.content.Intent;
//import android.content.SharedPreferences;
//import android.os.Bundle;
//import android.widget.Button;
//import android.widget.CheckBox;
//import android.widget.EditText;
//import android.widget.Toast;
//
//import androidx.appcompat.app.AppCompatActivity;
//
//public class LoginActivity extends AppCompatActivity {
//
//    EditText edtUsername, edtPassword;
//    Button btnLogin;
//    CheckBox chkRemember;
//    SharedPreferences sharedPreferences;
//
//    public static final String PREFS_NAME = "loginPrefs";
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_login);
//
//        edtUsername = findViewById(R.id.edtUsername);
//        edtPassword = findViewById(R.id.edtPassword);
//        btnLogin = findViewById(R.id.btnLogin);
//        chkRemember = findViewById(R.id.chkRemember);
//
//        sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
//
//        // Auto Login if Remember Me is checked
//        if (sharedPreferences.getBoolean("remember", false)) {
//            startActivity(new Intent(LoginActivity.this, MainActivity.class));
//            finish();
//        }
//
//        btnLogin.setOnClickListener(v -> {
//            String username = edtUsername.getText().toString().trim();
//            String password = edtPassword.getText().toString().trim();
//
//            // Validate input fields
//            if (username.isEmpty() || password.isEmpty()) {
//                Toast.makeText(LoginActivity.this, "Please enter username and password", Toast.LENGTH_SHORT).show();
//                return;
//            }
//
//            // If Remember Me is checked, save preference
//            if (chkRemember.isChecked()) {
//                sharedPreferences.edit().putBoolean("remember", true).apply();
//            }
//
//            // Go to MainActivity
//            startActivity(new Intent(LoginActivity.this, MainActivity.class));
//            finish();
//        });
//    }
//}
package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {

    EditText edtUsername, edtPassword;
    Button btnLogin, btnToSignup;
    CheckBox chkRemember;
    SharedPreferences sharedPreferences;

    public static final String PREFS_NAME = "loginPrefs";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        edtUsername = findViewById(R.id.edtUsername);
        edtPassword = findViewById(R.id.edtPassword);
        btnLogin = findViewById(R.id.btnLogin);
        chkRemember = findViewById(R.id.chkRemember);
        btnToSignup = findViewById(R.id.btnToSignup);  // Initialize the Sign Up button

        sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        // Auto Login if Remember Me is checked
        if (sharedPreferences.getBoolean("remember", false)) {
            startActivity(new Intent(LoginActivity.this, MainActivity.class));
            finish();
        }

        btnLogin.setOnClickListener(v -> {
            String username = edtUsername.getText().toString().trim();
            String password = edtPassword.getText().toString().trim();

            // Validate input fields
            if (username.isEmpty() || password.isEmpty()) {
                Toast.makeText(LoginActivity.this, "Please enter username and password", Toast.LENGTH_SHORT).show();
                return;
            }

            // If Remember Me is checked, save preference
            if (chkRemember.isChecked()) {
                sharedPreferences.edit().putBoolean("remember", true).apply();
            }

            // Go to MainActivity
            startActivity(new Intent(LoginActivity.this, MainActivity.class));
            finish();
        });

        // 👉 Sign Up button click opens SignupActivity
        btnToSignup.setOnClickListener(v -> {
            Intent intent = new Intent(LoginActivity.this, SignupActivity.class);
            startActivity(intent);
        });
    }
}