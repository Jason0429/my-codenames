package javaFiles;

public class RedWord extends Word {
    public RedWord(String word) {
        super(word);
        super.setTeam("red");
    }

    @Override
    public String getTeam() {
        return "red";
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
