import cv2
from time import sleep

from cvzone.HandTrackingModule import HandDetector
from pynput.keyboard import Controller

cap = cv2.VideoCapture(0)  # Setting up camera to capture video
cap.set(3, 1920)  # To set widths of frame, widths is represented by 3
cap.set(4, 720)  # To set height of frame, height is represented by 4

# To detect the hand with confidence level = 80% and maximum hands it could recognize set 2
detector = HandDetector(detectionCon=0.8, maxHands=1)
keyboard = Controller()
finalText = ""
# 2D array which will help in creating button
keys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "?", "/"]
]

button_list = []


def drawall(img, button_list):
    for button in button_list:
        x, y = button.pos
        w, h = button.size
        cv2.rectangle(img, button.pos, (x + w, y + h), (95, 0, 204), cv2.FILLED)
        cv2.putText(img, button.text, (x + 18, y + 60), cv2.FONT_HERSHEY_DUPLEX, 2, (255, 255, 255), 2)
    return img


class Button():
    def __init__(self, pos, text, size=(75, 75)):
        self.pos = pos
        self.size = size
        self.text = text

    # To create the button


for i in range(len(keys)):
    for j, key in enumerate(keys[i]):
        button_list.append(Button([100 * j + 5, 100 * i + 5], key))

while True:
    # To read the image
    success, img = cap.read()  # returns a tuple, which contains a boolean success flag, and the video frame
    # To find the hand on the image
    # By default it returns image and drawing amd if you are not drawing it will not give image back
    img = detector.findHands(img)
    lmList, bboxInfo = detector.findPosition(img)
    img = drawall(img, button_list)

    #Check if hand is or not
    if lmList :
        for button in button_list :
            x, y = button.pos
            w, h = button.size

            if x < lmList[8][0] < x+w and y < lmList[8][1] < y + h:
                cv2.rectangle(img, button.pos, (x + w, y + h), (0, 255, 0), cv2.FILLED)
                cv2.putText(img, button.text, (x + 18, y + 60), cv2.FONT_HERSHEY_DUPLEX, 2, (255, 255, 255), 2)
                l, _, _ = detector.findDistance(8, 12, img,draw=False)
                if l < 30:
                    keyboard.press(button.text)
                    cv2.rectangle(img, button.pos, (x + w, y + h), (0, 255, 0), cv2.FILLED)
                    cv2.putText(img, button.text, (x + 20, y + 65),
                                cv2.FONT_HERSHEY_PLAIN, 4, (255, 255, 255), 4)
                    finalText += button.text
                    sleep(0.15)
    cv2.rectangle(img, (350, 600), (1200, 500), (175, 0, 175), cv2.FILLED)
    cv2.putText(img, finalText, (360, 600),
                cv2.FONT_HERSHEY_PLAIN, 5, (255, 255, 255), 5)

    # Use to display an image in the window
    cv2.imshow('Gesture Based Keyboard & Mouse', img)  # camera is the window name and img is the image name
    cv2.waitKey(1)  # Use to display a window for given milliseconds
