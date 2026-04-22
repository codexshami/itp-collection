import cv2
import mediapipe as mp
import keyboard

cap = cv2.VideoCapture(0)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=2, min_detection_confidence=0.7)
draw = mp.solutions.drawing_utils

prev_gesture = ""
cooldown = 0

def get_y(hand, height):
    return hand.landmark[0].y * height

while True:
    success, frame = cap.read()
    if not success:
        break
    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    gesture = "IDLE"
    left_y = None
    right_y = None

    if results.multi_hand_landmarks and results.multi_handedness:
        for lm, hand in zip(results.multi_hand_landmarks, results.multi_handedness):
            label = hand.classification[0].label
            y = get_y(lm, h)
            if label == "Left":
                left_y = y
            else:
                right_y = y
            draw.draw_landmarks(frame, lm, mp_hands.HAND_CONNECTIONS)

        upper = h // 3
        lower = h * 2 // 3

        if left_y and left_y < upper and not right_y:
            gesture = "LEFT"
        elif right_y and right_y < upper and not left_y:
            gesture = "RIGHT"
        elif left_y and right_y and left_y < upper and right_y < upper:
            gesture = "JUMP"
        elif left_y and right_y and left_y > lower and right_y > lower:
            gesture = "SLIDE"

    if gesture != prev_gesture and cooldown == 0:
        print(f"Gesture: {gesture}")
        prev_gesture = gesture
        cooldown = 10
        if gesture == "LEFT":
            keyboard.press_and_release("a")
        elif gesture == "RIGHT":
            keyboard.press_and_release("d")
        elif gesture == "JUMP":
            keyboard.press_and_release("w")
        elif gesture == "SLIDE":
            keyboard.press_and_release("s")

    if cooldown > 0:
        cooldown -= 1

    cv2.putText(frame, gesture, (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 0), 2)
    cv2.imshow("Gesture Controller", frame)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
