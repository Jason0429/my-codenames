package javaFiles;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Requirements r = new Requirements();

        String[] w1a = { "horseshoe", "mother", "drop", "sahara", "ski", "church", "map", "file", "glass", "eagle",
                "racket", "spoon", "parade", "whale", "march", "tiger", "undertaker", "sound", "cloak", "mess", "robin",
                "buck", "blues", "mug", "wheelchair" };
        ArrayList<String> w1 = new ArrayList<String>();
        arrayToArrayList(w1a, w1);

        Word[] wordsArray1 = new Word[25];
        wordsArray1 = r.populateWordArray(wordsArray1, 0, w1.size(), w1);

        drawLine();
        System.out.println("Array of Words before mergeSort");
        drawLine();
        r.traverseArray(wordsArray1, 0);
        drawLine();
        System.out.println("Array of Words after mergeSort");
        drawLine();
        r.mergeSort(wordsArray1, 0, wordsArray1.length - 1);
        r.traverseArray(wordsArray1, 0);
        drawLine();

        ArrayList<Word> wordsArrayList1 = new ArrayList<Word>();
        w1 = new ArrayList<String>();
        arrayToArrayList(w1a, w1);
        wordsArrayList1 = r.populateWordArrayList(wordsArrayList1, 0, w1.size(), w1);
        drawLine();
        System.out.println("ArrayList of Words before mergeSort");
        drawLine();
        r.traverseArrayList(wordsArrayList1, 0);
        drawLine();
        System.out.println("ArrayList of Words after mergeSort");
        drawLine();
        r.mergeSort(wordsArrayList1, 0, wordsArrayList1.size() - 1);
        r.traverseArrayList(wordsArrayList1, 0);
        drawLine();

        Scanner sc = new Scanner(System.in);
        System.out.println("Binary Search");
        System.out.println("Please enter a word to search for:");
        String value = sc.nextLine();
        int result = r.binarySearch(wordsArray1, 0, wordsArray1.length, value);
        System.out.println(result == -1 ? "Sorry your word was not found." : value + " found at index " + result);
        sc.close();

    }

    public static void arrayToArrayList(String[] arr, ArrayList<String> arrList) {
        for (String s : arr) {
            arrList.add(s);
        }
    }

    public static void drawLine() {
        System.out.println("=================================");
    }

    public static void printArray(Word[] arr) {
        for (Word w : arr) {
            System.out.println(w);
        }
    }
}
