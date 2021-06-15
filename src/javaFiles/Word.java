package javaFiles;

public class Word {
    private String word;
    private String team;
    private boolean isRevealed;

    public Word() {
        this.word = "";
        this.team = "";
        this.isRevealed = false;
    }

    public Word(String word) {
        this.word = word;
        this.team = "";
        this.isRevealed = false;
    }

    public String getWord() {
        return this.word;
    }

    public String getTeam() {
        return this.team;
    }

    public boolean getIsRevealed() {
        return this.isRevealed;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public void setIsRevealed(boolean revealed) {
        this.isRevealed = revealed;
    }

    public boolean equals(Word other) {
        return this.getTeam().equals(other.getTeam()) && this.getWord().equals(other.getWord());
    }

    public String toString() {
        return "This is a " + getTeam() + " word. The word is " + getWord() + ".";
    }
}