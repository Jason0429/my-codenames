package javaFiles;

public class BlackWord extends Word {
    public BlackWord(String word) {
        super(word);
        super.setTeam("black");
    }

    @Override
    public String getTeam() {
        return "black";
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
