import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class HomePage {
  conversionType: string = '';
  fromUnit: string = '';
  toUnit: string = '';
  inputValue: number | null = null;
  result: string = '';
  currentOptions: string[] = [];

  unitOptions: { [key: string]: string[] } = {
    'Panjang': ['Kilometer', 'Meter', 'Centimeter'],
    'Massa': ['Ton', 'Kilogram', 'Gram'],
    'Waktu': ['Jam', 'Menit', 'Detik'],
    'Arus Listrik': ['Ampere', 'Milliampere'],
    'Suhu': ['Celcius', 'Fahrenheit', 'Kelvin'],
    'Intensitas Cahaya': ['Candela'],
    'Jumlah Zat': ['Mol', 'Milimol'],
  };

  onConversionTypeChange() {
    this.currentOptions = this.unitOptions[this.conversionType] || [];
    this.fromUnit = '';
    this.toUnit = '';
    this.inputValue = null;
    this.result = '';
  }

  onInputChange() {
    this.updateConversion();
  }

  onUnitChange() {
    if (this.inputValue !== null) {
      this.updateConversion();
    }
  }

  updateConversion() {
    if (this.conversionType && this.fromUnit && this.toUnit && this.inputValue !== null) {
      let convertedValue: number;
      switch (this.conversionType) {
        case 'Panjang':
          convertedValue = this.convertLength(this.inputValue, this.fromUnit, this.toUnit);
          break;
        case 'Massa':
          convertedValue = this.convertMass(this.inputValue, this.fromUnit, this.toUnit);
          break;
        case 'Waktu':
          convertedValue = this.convertTime(this.inputValue, this.fromUnit, this.toUnit);
          break;
        case 'Arus Listrik':
          convertedValue = this.convertCurrent(this.inputValue, this.fromUnit, this.toUnit);
          break;
        case 'Suhu':
          convertedValue = this.convertTemperature(this.inputValue, this.fromUnit, this.toUnit);
          break;
        case 'Intensitas Cahaya':
          convertedValue = this.inputValue; // No conversion needed for single unit
          break;
        case 'Jumlah Zat':
          convertedValue = this.convertSubstanceAmount(this.inputValue, this.fromUnit, this.toUnit);
          break;
        default:
          convertedValue = 0;
      }
      this.result = `${this.inputValue} ${this.fromUnit} = ${convertedValue.toFixed(2)} ${this.toUnit}`;
    } else {
      this.result = '';
    }
  }

  convertLength(value: number, fromUnit: string, toUnit: string): number {
    const rates: { [key: string]: number } = { 'Kilometer': 1000, 'Meter': 1, 'Centimeter': 0.01 };
    return (value * rates[fromUnit]) / rates[toUnit];
  }

  convertMass(value: number, fromUnit: string, toUnit: string): number {
    const rates: { [key: string]: number } = { 'Ton': 1000000, 'Kilogram': 1000, 'Gram': 1 };
    return (value * rates[fromUnit]) / rates[toUnit];
  }

  convertTime(value: number, fromUnit: string, toUnit: string): number {
    const rates: { [key: string]: number } = { 'Jam': 3600, 'Menit': 60, 'Detik': 1 };
    return (value * rates[fromUnit]) / rates[toUnit];
  }

  convertCurrent(value: number, fromUnit: string, toUnit: string): number {
    const rates: { [key: string]: number } = { 'Ampere': 1000, 'Milliampere': 1 };
    return (value * rates[fromUnit]) / rates[toUnit];
  }

  convertTemperature(value: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === toUnit) return value;
    
    let celsius: number;
    switch (fromUnit) {
      case 'Celcius':
        celsius = value;
        break;
      case 'Fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'Kelvin':
        celsius = value - 273.15;
        break;
      default:
        return 0;
    }

    switch (toUnit) {
      case 'Celcius':
        return celsius;
      case 'Fahrenheit':
        return (celsius * 9/5) + 32;
      case 'Kelvin':
        return celsius + 273.15;
      default:
        return 0;
    }
  }

  convertSubstanceAmount(value: number, fromUnit: string, toUnit: string): number {
    const rates: { [key: string]: number } = { 'Mol': 1, 'Milimol': 0.001 };
    return (value * rates[fromUnit]) / rates[toUnit];
  }
}
