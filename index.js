const { SignalGenerator } = require("./src/signal");
const { Chart } = require("./src/chart");
const { getDFT, getFFT, complexToReal } = require("./src/transformation");

const signalHarmonics = 14;
const frequency = 1700;
const disRepetitions = 64;

(async () => {
  const { x, y } = new SignalGenerator(
    signalHarmonics,
    frequency,
    disRepetitions
  ).generateSignal();
  const dftSpectrum = complexToReal(getDFT(y));
  const fftSpectrum = complexToReal(getFFT(y));

  const signalChart = new Chart({ title: "Signal Generation" });
  signalChart.setData(x, y);
  await signalChart.generateImage("./examples/random_signal.png");

  const dftChart = new Chart({ title: "DFT" });
  dftChart.setData(x, dftSpectrum);
  await dftChart.generateImage("./examples/dft.png");

  const fftChart = new Chart({ title: "FFT" });
  fftChart.setData(x, fftSpectrum);
  await fftChart.generateImage("./examples/fft.png");
})();
