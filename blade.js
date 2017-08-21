'use strict';

class Blade {
    constructor() {
        this.deck = []
        for(var i = 0; i <= 4; i++) {
            this.deck.push('1', '2', '3', '4', '5', '6', '7', 'Blast', 'Bolt', 'Mirror', 'Force')
        }
        this.deck = this.shuffle(this.deck)
        this.decks = []
        this.decks[0] = this.deck
        this.decks[1] = this.decks[0].splice(0, 22) //halve the deck
    }

    gameState() {
        return this.deck
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    firstHand(user) {
        return this.decks[user].splice(0, 9)
    }
}

module.exports = new Blade();