const Colors = {
  black: 'rgb(0,0,0)',
  blue: '#007bff',
  green: '#28a745',
  grey: 'rgb(127,127,127)',
  red: '#dc3545',
  white: 'rgb(255, 255, 255)',
  do1: 'rgb(218, 165, 32)',
  re: 'rgb(230, 230, 250)',
  mi: 'rgb(170, 250, 172)',
  sol: 'rgb(222, 129, 192)',
  la: 'rgb(132, 170, 233)',
  do2: 'rgb(255,248,220)',
}

export default {
  colors: [
    {
      color: Colors.blue,
      sample: 'kick',
    },
    {
      color: Colors.green,
      sample: 'clap',
    },
    {
      color: Colors.red,
      sample: 'snap',
    },
  ],
  notes: [
    {
      color: Colors.do1,
      sample: 'do1',
      text: 'DÓ',
    },
    {
      color: Colors.re,
      sample: 're',
      text: 'RÉ',
    },
    {
      color: Colors.mi,
      sample: 'mi',
      text: 'MI',
    },
    {
      color: Colors.sol,
      sample: 'sol',
      text: 'SOL',
    },
    {
      color: Colors.la,
      sample: 'la',
      text: 'LÁ',
    },
    {
      color: Colors.do2,
      sample: 'do2',
      text: 'dó',
    },
  ],
}
