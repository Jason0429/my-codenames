package javaFiles;

public class BlueWord extends Word {
    public BlueWord(String word) {
        super(word);
        super.setTeam("blue");
    }

    @Override
    public String getTeam() {
        return "blue";
    }

    @Override
    public String toString() {
        return "This is a " + getTeam() + " word. The word is " + super.getWord() + ".";
    }

    @Override
    public boolean equals(Word other) {
        return this.getTeam().equals(other.getTeam()) && this.getWord().equals(other.getWord());
    }
}
