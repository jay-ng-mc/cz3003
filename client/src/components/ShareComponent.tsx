import React, { Component} from 'react';
import { FacebookProvider, ShareButton } from 'react-facebook';
 
export default class ShareComponent extends Component {
  render() {
    return (
      <FacebookProvider appId="218034988644341">
        <ShareButton href="localhost:3000">
          Share
        </ShareButton>
      </FacebookProvider>
    );
  }
}