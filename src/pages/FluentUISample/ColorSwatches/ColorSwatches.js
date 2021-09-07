import * as React from 'react';
import { Stack } from '@fluentui/react';
import './ColorSwatches.scss';

export const ColorSwatches = () => (
  <Stack className="color-swatches">
    <Stack>
      <div className="fluentDivTitle">
        <span className="titleLine" />
        <span>
          <h5>Color swatches</h5>
        </span>
      </div>
      <h5>
        Neutrals <small>Text / Background</small>
      </h5>
      <Stack horizontal className="shade-group">
        <div className="shade-item">
          <div className="shade-color black-bg" data-color-var="$black" />
        </div>
        <div className="shade-item">
          <div
            className="shade-color gray-darker-bg"
            data-color-var="$gray-dark"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color gray-dark-bg"
            data-color-var="$gray-dark"
          />
        </div>
        <div className="shade-item">
          <div className="shade-color gray-bg" data-color-var="$gray" />
        </div>
        <div className="shade-item">
          <div
            className="shade-color gray-light-bg"
            data-color-var="$gray-light"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color gray-lighter-bg"
            data-color-var="$gray-lighter"
          />
        </div>
        <div className="shade-item">
          <div className="shade-color white-bg" data-color-var="$white" />
        </div>
      </Stack>
    </Stack>
    <Stack>
      <h5>
        Red <small>Error/ Danger</small>
      </h5>
      <Stack horizontal className="shade-group">
        <div className="shade-item">
          <div
            className="shade-color red-darker-bg"
            data-color-var="$red-darker"
          />
        </div>
        <div className="shade-item">
          <div className="shade-color red-dark-bg" data-color-var="$red-dark" />
        </div>
        <div className="shade-item">
          <div className="shade-color red-bg" data-color-var="$red" />
        </div>
        <div className="shade-item">
          <div
            className="shade-color red-light-bg"
            data-color-var="$red-light"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color red-lighter-bg"
            data-color-var="$red-lighter"
          />
        </div>
      </Stack>
    </Stack>
    <Stack>
      <h5>
        Orange Red <small>Exam</small>
      </h5>
      <Stack horizontal className="shade-group">
        <div className="shade-item">
          <div
            className="shade-color orange-red-darker-bg"
            data-color-var="$orange-red-darker"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color orange-red-dark-bg"
            data-color-var="$orange-red-dark"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color orange-red-bg"
            data-color-var="$orange-red"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color orange-red-light-bg"
            data-color-var="$orange-red-light"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color orange-red-lighter-bg"
            data-color-var="$orange-red-lighter"
          />
        </div>
      </Stack>
    </Stack>
    <Stack>
      <h5>
        Orange <small> Secondary / Warning</small>
      </h5>
      <Stack horizontal className="shade-group">
        <div className="shade-item">
          <div
            className="shade-color orange-darker-bg"
            data-color-var="$orange-darker"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color orange-dark-bg"
            data-color-var="$orange-dark"
          />
        </div>
        <div className="shade-item">
          <div className="shade-color orange-bg" data-color-var="$orange" />
        </div>
        <div className="shade-item">
          <div
            className="shade-color orange-light-bg"
            data-color-var="$orange-light"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color orange-lighter-bg"
            data-color-var="$orange-lighter"
          />
        </div>
      </Stack>
    </Stack>
    <Stack>
      <h5>
        Green <small> Success / Personal / Private</small>
      </h5>
      <Stack horizontal className="shade-group">
        <div className="shade-item">
          <div
            className="shade-color green-darker-bg"
            data-color-var="$green-darker"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color green-dark-bg"
            data-color-var="$green-dark"
          />
        </div>
        <div className="shade-item">
          <div className="shade-color green-bg" data-color-var="$green" />
        </div>
        <div className="shade-item">
          <div
            className="shade-color green-light-bg"
            data-color-var="$green-light"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color green-lighter-bg"
            data-color-var="$green-lighter"
          />
        </div>
      </Stack>
    </Stack>
    <Stack>
      <h5>
        Blue <small>Link / Others</small>
      </h5>
      <Stack horizontal className="shade-group">
        <div className="shade-item">
          <div
            className="shade-color blue-darker-bg"
            data-color-var="$blue-darker"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color blue-dark-bg"
            data-color-var="$blue-dark"
          />
        </div>
        <div className="shade-item">
          <div className="shade-color blue-bg" data-color-var="$blue" />
        </div>
        <div className="shade-item">
          <div
            className="shade-color blue-light-bg"
            data-color-var="$blue-light"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color blue-lighter-bg"
            data-color-var="$blue-lighter"
          />
        </div>
      </Stack>
    </Stack>
    <Stack>
      <h5>
        Purple <small>Primary</small>
      </h5>
      <Stack horizontal className="shade-group">
        <div className="shade-item">
          <div
            className="shade-color purple-darker-bg"
            data-color-var="$purple-darker"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color purple-dark-bg"
            data-color-var="$purple-dark"
          />
        </div>
        <div className="shade-item">
          <div className="shade-color purple-bg" data-color-var="$purple" />
        </div>
        <div className="shade-item">
          <div
            className="shade-color purple-light-bg"
            data-color-var="$purple-light"
          />
        </div>
        <div className="shade-item">
          <div
            className="shade-color purple-lighter-bg"
            data-color-var="$purple-lighter"
          />
        </div>
      </Stack>
    </Stack>
  </Stack>
);

export default ColorSwatches;
