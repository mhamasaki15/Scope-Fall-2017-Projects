import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Modal,
  Button,
  TextInput
} from 'react-native';

/*
  Import our two custom components
*/
import NewCardModal from './NewCardModal';
import Card from './Card';

/*
  Default set of cards
*/
const DEFAULT_CARDS = [
  {
    cardId: 0,
    term: "TERM",
    definition: "Sample definition"
  }
];

class App extends Component {
  // Fill this out
  state = {
    cards: DEFAULT_CARDS,
    modalVisible: false,
    cardId: 1
  }

  /*
    Toggles the new card modal
  */
  _toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }


  /*
    Passed to the Card modal
    Called when user decides to delete the card.
    Finds cardId and removes it from array.
  */

  _deleteCard = (_cardId) => {
    cards = this.state.cards;
    cards = cards.filter(function(obj){
      return obj.cardId !== _cardId;
    });

    this.setState({
      cards: cards
    });
  }


  /*
    Passed to the new card modal.
    Called when user decides to add new card.
    Creates card object and adds it to our state
  */
  _addCard = (_term, _definition) => {
    const cards = this.state.cards;
    cardId = this.state.cardId;
    cards.push({
      term: _term,
      definition: _definition,
      cardId: cardId
    });

    this.setState({
      cardId: cardId+1
    });

    this.setState({
      cards: cards
    });

    this.setState({
      modalVisible: false
    });
  }

  /*
    Shuffles cards
  */
  _shuffleCards = () => {
    const cards = this.state.cards;

    for (let i = cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
    }

    this.setState({
      cards: cards
    });
  }


  render() {
    // Loop through the cards array in state and create Card component for each card
    const cards = this.state.cards.map((card, index) => {
      return (
        <Card cardData={card} key={index} deleteCard={this._deleteCard}/>
      )
    });

    return (

      <View style={styles.container}>
        <NewCardModal
          modalVisible={this.state.modalVisible}
          toggleModal={this._toggleModal}
          addCard={this._addCard}
        />

        <View style={styles.shuffleContainer}> 
        <Button
          style={styles.shuffleButton}
          onPress={this._shuffleCards}
          title="⇄ Shuffle Cards"
          color="#000000"
          accessibilityLabel="Press this to shuffle the cards!"
          />
          </View>

        <ScrollView>
          {cards}
        </ScrollView>
        <TouchableHighlight
          style={styles.addButton}
          onPress={this._toggleModal}
          underlayColor='#128040'
          >
            <Text style={styles.addButtonText}>Add Card</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shuffleContainer: {
    alignItems: 'flex-start',
    paddingTop: 25,
    backgroundColor: "#ecf0f1"
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingTop: 20,
    paddingBottom: 20
  },
  addButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20
  }
});

export default App;
