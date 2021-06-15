package javaFiles;

public class WhiteWord extends Word {
    public WhiteWord(String word) {
        super(word);
        super.setTeam("white");
    }

    @Override
    public String getTeam() {
        return "white";
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
