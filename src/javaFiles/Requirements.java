package javaFiles;

public class Requirements {
    private final String WORDS_JSON = getClass().getResource("words.json").toString();

    public String printWordsJSON() {
        return this.WORDS_JSON;
    }

    public Word[] populateWordArray(Word[] arr, int i, int length, ArrayList<String> words) {
        // Add 25 words to words arraylist

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
        } else if (i < 24) {
            arr[i] = new WhiteWord(words.remove(0));
        } else {
            arr[i] = new BlackWord(words.remove(0));
        }

        return populateWordArray(arr, ++i, length);
    }

    public ArrayList<Word> populateWordArrayList(ArrayList<Word> arr, int i, int length, ArrayList<String> words) {
        // Add 25 words to words arraylist

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
        } else if (i < 24) {
            arr.add(new WhiteWord(words.remove(0)));
        } else {
            arr.add(new BlackWord(words.remove(0)));
        }

        return populateWordArrayList(arr, ++i, length, words);
    }

    // Recursively traverses an array
    // i must start at 0
    public String traverseArray(Word[] arr, int i) {
        if (i == arr.length) {
            return null;
        }

        System.out.println(arr[i]);

        return traverseArray(arr, ++i);
    }

    // Recursively traverses an ArrayList
    // i must start at 0
    public String traverseArrayList(ArrayList<Word> arr, int i) {
        if (i == arr.size()) {
            return null;
        }

        System.out.println(arr.get(i));

        return traverseArray(arr, ++i);
    }

    // Merge Sort (Array)

    // Merge Sort (ArrayList)

    // Binary Search


}
