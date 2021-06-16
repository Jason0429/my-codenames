package javaFiles;

import java.util.ArrayList;

public class Requirements {
    public Word[] populateWordArray(Word[] arr, int i, int length, ArrayList<String> words) {
        if (i == length) {
            return arr;
        }

        if (words.size() == 0) {
            return arr;
        }

        if (i < 9) {
            arr[i] = new RedWord(words.remove(0));
        } else if (i < 17) {
            arr[i] = new BlueWord(words.remove(0));
        } else if (i < 18) {
            arr[i] = new BlackWord(words.remove(0));
        } else {
            arr[i] = new WhiteWord(words.remove(0));
        }

        return populateWordArray(arr, ++i, length, words);
    }

    public ArrayList<Word> populateWordArrayList(ArrayList<Word> arr, int i, int length, ArrayList<String> words) {
        if (i == length) {
            return arr;
        }

        if (words.size() == 0) {
            return arr;
        }

        if (i < 9) {
            arr.add(new RedWord(words.remove(0)));
        } else if (i < 17) {
            arr.add(new BlueWord(words.remove(0)));
        } else if (i < 18) {
            arr.add(new BlackWord(words.remove(0)));
        } else {
            arr.add(new WhiteWord(words.remove(0)));
        }

        return populateWordArrayList(arr, ++i, length, words);
    }

    // Recursively traverses an array
    // i must start at 0
    public boolean traverseArray(Word[] arr, int i) {
        if (i == arr.length) {
            return true;
        }

        System.out.println(arr[i]);

        return traverseArray(arr, ++i);
    }

    // Recursively traverses an ArrayList
    // i must start at 0
    public boolean traverseArrayList(ArrayList<Word> arr, int i) {
        if (i == arr.size()) {
            return true;
        }

        System.out.println(arr.get(i));

        return traverseArrayList(arr, ++i);
    }

    // Merge helper method (ArrayList)
    public void merge(ArrayList<Word> arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;

        ArrayList<Word> L = new ArrayList<Word>();
        for (int i = 0; i < n1; i++) {
            L.add(null);
        }
        ArrayList<Word> R = new ArrayList<Word>();
        for (int i = 0; i < n2; i++) {
            R.add(null);
        }

        for (int i = 0; i < n1; ++i)
            L.set(i, arr.get(l + i));
        for (int j = 0; j < n2; ++j)
            R.set(j, arr.get(m + 1 + j));

        int i = 0;
        int j = 0;

        int k = l;
        while (i < n1 && j < n2) {
            if (L.get(i).getWord().compareTo(R.get(j).getWord()) <= 0) {
                arr.set(k, L.get(i));
                i++;
            } else {
                arr.set(k, R.get(j));
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr.set(k, L.get(i));
            i++;
            k++;
        }

        while (j < n2) {
            arr.set(k, R.get(j));
            j++;
            k++;
        }
    }

    // Merge helper method (Array)
    public void merge(Word[] arr, int l, int m, int r) {
        // Find sizes of two subarrays to be merged
        int n1 = m - l + 1;
        int n2 = r - m;

        Word[] L = new Word[n1];
        Word[] R = new Word[n2];

        for (int i = 0; i < n1; ++i)
            L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j)
            R[j] = arr[m + 1 + j];

        int i = 0;
        int j = 0;

        int k = l;
        while (i < n1 && j < n2) {
            if (L[i].getWord().compareTo(R[j].getWord()) <= 0) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    // Merge Sort (Array)
    public void mergeSort(Word[] arr, int l, int r) {
        if (l < r) {
            // Find the middle point
            int m = l + (r - l) / 2;

            // Sort first and second halves
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);

            // Merge the sorted halves
            merge(arr, l, m, r);
        }
    }

    // Merge Sort (ArrayList)
    public void mergeSort(ArrayList<Word> arr, int l, int r) {
        if (l < r) {
            // Find the middle point
            int m = l + (r - l) / 2;

            // Sort first and second halves
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);

            // Merge the sorted halves
            merge(arr, l, m, r);
        }
    }

    // Binary Search
    public int binarySearch(Word[] arr, int l, int r, String value) {
        if (r >= l) {
            int mid = l + (r - l) / 2;

            // If found
            if (arr[mid].getWord().equals(value))
                return mid;

            if (arr[mid].getWord().compareTo(value) > 0)
                return binarySearch(arr, l, mid - 1, value);

            return binarySearch(arr, mid + 1, r, value);
        }

        // If not found
        return -1;
    }
}
