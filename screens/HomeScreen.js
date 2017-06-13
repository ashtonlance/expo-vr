import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import videojs from 'video.js/dist/video.js';
import panorama from 'videojs-panorama/dist/videojs-panorama.v5.js';


import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };
constructor(props){
        super(props);
        this.displayName = 'PanoramaVideoPlayer';
        this.player = null;
    }

    initializePlayer(){
        var { videoInfo } = this.props;
        var videoElement = this.refs.player;
        var isMobile = isMobileOrTablet();

        this.player = videojs(videoElement, {},  () => {
            window.addEventListener("resize", () => {
                var canvas = this.player.getChild('Canvas');
                if(canvas) canvas.handleResize();
            });
        });

        this.player.poster(videoInfo.imageURL);
        this.player.src({src: videoInfo.videoURL, type: "video/mp4" });

        var width = videoElement.offsetWidth;
        var height = videoElement.offsetHeight;
        this.player.width(width), this.player.height(height);
        panorama(this.player, {
            clickToToggle: (!isMobile),
            autoMobileOrientation: true,
            initFov: 100,
            VREnable: isMobile,
            clickAndDrag: true,
            NoticeMessage: (isMobile)? "please drag and drop the video" : "please use your mouse drag and drop the video"
        });

        this.player.on("VRModeOn", function(){
            this.player.controlBar.fullscreenToggle.trigger("tap");
        });
    }

    componentDidMount(){
        this.initializePlayer();
    }

  render() {
    return (
      <div className="panroama__video__player">
                <div className="panroama__video__player__wrapper">
                    <div className="panroama__video__player__container">
                        <video className="video-js vjs-default-skin" crossOrigin="anonymous" controls ref="player">
                        </video>
                    </div>
                </div>
            </div>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will run slightly slower but
          you have access to useful development tools. {learnMoreButton}.
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    Linking.openURL(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
    marginTop: -40,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
