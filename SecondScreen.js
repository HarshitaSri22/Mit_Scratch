import React, { useState } from 'react';
import { View, StyleSheet, Text, PanResponder, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Screen = () => {
  const [codeFrameBlocks, setCodeFrameBlocks] = useState([
    { text: 'Move X by 50', viewKey: 'block1', backgroundColor: '#78C1F3' },
    { text: 'Move Y by 50', viewKey: 'block2', backgroundColor: '#78C1F3' },
    { text: 'Rotate 360', viewKey: 'block3', backgroundColor: '#78C1F3' },
    { text: 'goto (0,0)', viewKey: 'block4', backgroundColor: '#78C1F3' },
    { text: 'Move X=50, Y=50', viewKey: 'block5', backgroundColor: '#78C1F3' },
    { text: 'go to random position', viewKey: 'block6', backgroundColor: '#78C1F3' },
    { text: 'Say Hello', viewKey: 'block7', backgroundColor: '#78C1F3' },
    { text: 'Say Hello for 1 sec', viewKey: 'block8', backgroundColor: '#78C1F3' },
    { text: 'Increase Size', viewKey: 'block9', backgroundColor: '#78C1F3' },
    { text: 'Dec Size', viewKey: 'block10', backgroundColor: '#78C1F3' },
    { text: 'Repeat', viewKey: 'block11', backgroundColor: '#78C1F3' },
  ]);
  const [actionFrameBlocks, setActionFrameBlocks] = useState([]);

  const createPanResponder = (viewKey, isCodeFrame) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const blockIndex = isCodeFrame
          ? codeFrameBlocks.findIndex((block) => block.viewKey === viewKey)
          : actionFrameBlocks.findIndex((block) => block.viewKey === viewKey);

        if (blockIndex !== -1) {
          const movedBlock = isCodeFrame ? codeFrameBlocks[blockIndex] : actionFrameBlocks[blockIndex];
          const copiedBlock = { ...movedBlock };
          copiedBlock.x = gesture.dx;
          copiedBlock.y = gesture.dy;

          if (isCodeFrame) {
            copiedBlock.isCopy = true;
            const hasCopyInActionFrame = actionFrameBlocks.some((block) => block.viewKey === viewKey && block.isCopy);
            if (!hasCopyInActionFrame) {
              setActionFrameBlocks([...actionFrameBlocks, copiedBlock]);
            }
          } else {
            setActionFrameBlocks([
              ...actionFrameBlocks.slice(0, blockIndex),
              copiedBlock,
              ...actionFrameBlocks.slice(blockIndex + 1),
            ]);
          }
        }
      },
      onPanResponderRelease: () => {
        const blockIndex = actionFrameBlocks.findIndex((block) => block.viewKey === viewKey);

        if (blockIndex !== -1) {
          const movedBlock = actionFrameBlocks[blockIndex];

          if (movedBlock.isCopy) {
            const originalBlockIndex = codeFrameBlocks.findIndex((block) => block.viewKey === viewKey);

            if (originalBlockIndex !== -1) {
              const originalBlock = codeFrameBlocks[originalBlockIndex];
              setCodeFrameBlocks([...codeFrameBlocks.slice(0, originalBlockIndex), originalBlock, ...codeFrameBlocks.slice(originalBlockIndex + 1)]);
            }
          }

          // Comment out the line below to prevent the block from being removed
          // setActionFrameBlocks([...actionFrameBlocks.slice(0, blockIndex), ...actionFrameBlocks.slice(blockIndex + 1)]);
        }
      },
    });
  };

  const renderRectangle = (block, isCodeFrame) => {
    const { text, viewKey, backgroundColor } = block;
    const panResponder = createPanResponder(viewKey, isCodeFrame);
    const blockStyle = {
      backgroundColor,
      transform: [{ translateX: block.x || 0 }, { translateY: block.y || 0 }],
    };

    return (
      <Animated.View
        key={viewKey}
        style={[styles.rectangle, blockStyle]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.rectangleText}>{text}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Text style={styles.titleText}>
          <FontAwesome name="code" size={30} color="blue" /> Code
        </Text>
        <View style={styles.rectangleContainer}>
          {codeFrameBlocks.map((block) => renderRectangle(block, true))}
        </View>
      </View>
      <View style={styles.frame}>
        <Text style={styles.titleText}>
          <FontAwesome name="flag" size={30} color="green" /> Action
        </Text>
        <View style={styles.rectangleContainer}>
          {actionFrameBlocks.map((block) => renderRectangle(block, false))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  frame: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  rectangleContainer: {
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rectangle: {
    width: 165,
    height: 30,
    backgroundColor: '#78C1F3',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangleText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Screen;
