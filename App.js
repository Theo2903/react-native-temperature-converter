import { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";

import { s } from "./App.style";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";

import { DEFAULT_TEMPERATURE, DEFAULT_UNITS, UNITS } from "./constant";

import { TemperatureDisplay } from "./components/TemperatureDisplay/TemperatureDisplay";
import { InputTemperature } from "./components/InputTemperature/InputTemperature";
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert";

import {
  getOppositeUnit,
  convertTemperatureTo,
  isIceTemperature,
} from "./services/temperature-services";

export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_TEMPERATURE);
  const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNITS);
  const [currentBackground, setCurrentBackground] = useState();
  const oppositeUnit = getOppositeUnit(currentUnit);

  useEffect(() => {
    const temperatureAsFloat = Number.parseFloat(inputValue);
    if (!isNaN(temperatureAsFloat)) {
      const isColdBackground = isIceTemperature(inputValue, currentUnit);
      setCurrentBackground(isColdBackground ? coldBackground : hotBackground);
    }
  }, [inputValue, currentUnit]);

  const getConvertedTemperature = () => {
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat)
      ? ""
      : convertTemperatureTo(oppositeUnit, valueAsFloat).toFixed(1);
  };

  return (
    <ImageBackground source={currentBackground} style={s.container}>
      <View style={s.workspace}>
        <TemperatureDisplay
          value={getConvertedTemperature()}
          unit={oppositeUnit}
        />
        <InputTemperature
          onChangeText={setInputValue}
          defaultValue={DEFAULT_TEMPERATURE}
          unit={currentUnit}
        />
        <ButtonConvert
          onPress={() => {
            setCurrentUnit(oppositeUnit);
          }}
          unit={currentUnit}
        />
      </View>
    </ImageBackground>
  );
}
