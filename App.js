import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, PanResponder } from 'react-native';
import { useNavigation, useRoute, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SecondScreen from './SecondScreen';
import ButtonComponent from './components/ButtonComp';

const Stack = createStackNavigator();

const HomeScreen = () => {
  const catRef = useRef(null); // Reference for the cat image
  const ballRef = useRef(null); // Reference for the ball image
  const [catCoordinates, setCatCoordinates] = useState({ x: 0, y: 0 });
  const [ballCoordinates, setBallCoordinates] = useState({ x: 0, y: 0 });
  const navigation = useNavigation();
  const route = useRoute();
  const instruction = route.params?.instruction;

  useEffect(() => {
    if (instruction === 'Move X by 50') {
      setCatCoordinates((prevCoordinates) => ({
        x: prevCoordinates.x + 50,
        y: prevCoordinates.y,
      }));
    }
  }, [instruction]);

  const catPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const { dx, dy } = gesture;

        catRef.current.setNativeProps({
          style: {
            transform: [
              { translateX: dx },
              { translateY: dy },
            ],
          },
        });

        setCatCoordinates({ x: dx, y: dy });
      },
    })
  ).current;

  const ballPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const { dx, dy } = gesture;

        ballRef.current.setNativeProps({
          style: {
            transform: [
              { translateX: dx },
              { translateY: dy },
            ],
          },
        });

        setBallCoordinates({ x: dx, y: dy });
      },
    })
  ).current;

  const handleButtonPress = () => {
    navigation.navigate('Second');
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Image
          source={require('./assets/restart.png')}
          style={{ width: 45, height: 45, position: 'sticky', top: -110, left: 150 }}
        />
        <Image
          ref={catRef}
          source={{
            uri:
              'https://lh3.googleusercontent.com/-TVSNvrqG5yXuvkcchscan6Q9Snhkb02AQb90GeUSNqhiGF4gV42mXIgHBFd5RWoYbJmWw=s85',
          }}
          style={{ width: 45, height: 45 }}
          {...catPanResponder.panHandlers}
        />
        {/* Ball Image */}
        <Image
          ref={ballRef}
          source={{uri: 'https://img.freepik.com/free-vector/doodle-soccer-ball_1034-741.jpg?w=826&t=st=1688982425~exp=1688983025~hmac=03bca731237b85b47d62e2505deffab9b63092ee1429598dcd9f58f77c072739'}} // Replace with the actual image source of the ball
          style={{ width: 45, height: 45 }}
          {...ballPanResponder.panHandlers}
        />
        {/* End of Ball Image */}
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/play.png')}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.desk}>
        <Text style={styles.text}>Sprite</Text>
        <Text style={styles.spanBox}>
          Cat X: {catCoordinates.x.toFixed(2)}, Y: {catCoordinates.y.toFixed(2)} | 
          Ball X: {ballCoordinates.x.toFixed(2)}, Y: {ballCoordinates.y.toFixed(2)}
        </Text>
      </View>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Scratch</Text>
      </View>
      {/* ButtonComponent */}
      <ButtonComponent
        onPress={handleButtonPress}
        title={<Image source={{ uri: 'https://lh3.googleusercontent.com/-TVSNvrqG5yXuvkcchscan6Q9Snhkb02AQb90GeUSNqhiGF4gV42mXIgHBFd5RWoYbJmWw=s85' }} style={{ width: 45, height: 45 }} />}
      />
      {/* Ball Image Button */}
      <ButtonComponent
        onPress={handleButtonPress}
        title={<Image source={{uri: 'https://img.freepik.com/free-vector/doodle-soccer-ball_1034-741.jpg?w=826&t=st=1688982425~exp=1688983025~hmac=03bca731237b85b47d62e2505deffab9b63092ee1429598dcd9f58f77c072739'}} style={{ width: 45, height: 45 }} />} // Replace with the actual image source of the ball
      />
      {/* End of Ball Image Button */}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#d8dde6',
    top: 240,
  },
  topBar: {
    position: 'absolute',
    top: -220,
    left: 0,
    right: 0,
    backgroundColor: 'blue',
    height: 50,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarText: {
    fontSize: 25,
    fontFamily: 'Consolas',
    color: 'yellow',
    position: 'relative',
    left: -120,
  },
  spanBox: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    position: 'relative',
  },
  desk: {
    width: 380,
    height: 80,
    position: 'absolute',
    backgroundColor: 'white',
    top: 230,
    left: 7,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  frame: {
    position: 'absolute',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -200,
    left: 7,
    width: 380,
    height: 420,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 45,
    height: 45,
    marginHorizontal: 10,
    position: 'absolute',
    top: 100,
    left: 115,
  },
});

export default App;

