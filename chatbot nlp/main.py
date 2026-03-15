import nltk
import random
import string
from nltk.chat.util import Chat, reflections
from nltk.corpus import wordnet

nltk.download('punkt')
nltk.download('wordnet')

# Sample chatbot pairs (you can expand this)
pairs = [
    # Greetings
    ["hi|hello|hey", ["Hello!", "Hi there!", "Hey! How can I help you?"]],
    ["good morning", ["Good morning!", "Morning! Ready to assist you."]],
    ["good evening", ["Good evening!", "Evening! How can I help?"]],
    
    # Name and identity
    ["what is your name?", ["I'm CODTECH Chatbot.", "They call me your AI assistant."]],
    ["who created you?", ["I was created by a CODTECH intern using Python and NLTK."]],

    # Internship Info
    ["what is codtech?", ["CODTECH is an internship and training company.", "A great place to learn and intern!"]],
    ["what is this internship about?", ["This internship teaches you Python and real-world project building."]],
    ["when will I get certificate?", ["You will receive your certificate on your internship end date."]],
    
    # Help
    ["what can you do?", ["I can answer your questions and help you with Python, coding, and internship queries."]],
    ["help me", ["Sure! Tell me what you need help with."]],
    ["i need assistance", ["I'm here for you. Please tell me your question."]],

    # Python / Programming
    ["what is python?", ["Python is a popular programming language used in AI, data science, and web development."]],
    ["what is a variable?", ["A variable stores data that can be used and changed in a program."]],
    ["what is a list in python?", ["A list is a collection of items in a particular order."]],
    ["how to create a function in python?", ["Use 'def function_name():' followed by the indented code block."]],
    ["what is an if statement?", ["It lets you run code only if a condition is true."]],
    
    # General questions
    ["how are you?", ["I'm doing great, thank you!", "All systems functional."]],
    ["what day is it?", ["I'm not sure, but you can check your device's clock."]],
    ["tell me a joke", ["Why do programmers prefer dark mode? Because light attracts bugs!"]],
    
    # Exit phrases
    ["bye|exit|quit", ["Goodbye!", "See you later!", "Thanks for chatting!"]],

    # Fallback/default
    [".*", ["I'm not sure how to respond to that.", "Can you rephrase the question?", "Interesting... tell me more."]],
]


# Build chatbot
chatbot = Chat(pairs, reflections)

def main():
    print("🤖 CODTECH NLP Chatbot\nType 'quit' to exit.")
    chatbot.converse()

if __name__ == "__main__":
    main()
