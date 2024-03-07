import TrackPlayer from 'react-native-track-player';

async function setup() {
  await TrackPlayer.setupPlayer();
  // Add additional setup code if needed
}

module.exports = async function () {
  await setup();

  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

  TrackPlayer.addEventListener('playback-track-changed', async (event) => {
    const track = await TrackPlayer.getTrack(event.nextTrack);
    // Do something with the new track
  });

  TrackPlayer.addEventListener('playback-state', (event) => {
    // Handle playback state changes
  });

  return () => TrackPlayer.destroy();
};
