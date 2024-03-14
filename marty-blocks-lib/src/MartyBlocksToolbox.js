export function MartyBlocksToolbox_motion() {
  return `
    <!-- MARTY MOTION BLOCKS -->

    <block type="mv2_getReady" />

    <block type="mv2_circle" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
        <value name="SIDE">
                <field></field>
        </value>
    </block>

    <block type="mv2_dance" />

    <block type="mv2_eyes" >
        <value>
            <field name="COMMAND"></field>
        </value>
    </block>

    <block type="mv2_kick" >
        <value>
            <field name="SIDE">left</field>
        </value>
    </block>

    <block type="mv2_hold" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_lean" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="SIDE">
                <field name="SIDE_"></field>
        </value>
    </block>

    <block type="mv2_liftFoot" >
        <value>
            <field name="SIDE">left</field>
        </value>
    </block>

    <block type="mv2_lowerFoot" >
        <value>
            <field name="SIDE">left</field>
        </value>
    </block>

    <block type="mv2_moveJoint" >
        <value>
            <field name="SERVOCHOICE">left hip</field>
        </value>
        <value name="ANGLE">
            <shadow type="math_number">
                <field name="NUM">10</field>
            </shadow>
        </value>
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>

    <!-- moveleg if it would load -->

    <block type="mv2_slide" >
        <value name="SIDE">
                <field>left</field>
        </value>
        <value name="STEPS">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="STEPLEN">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_slideMsLength" >
        <value name="SIDE">
                <field>left</field>
        </value>
        <value name="STEPS">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">1.5</field>
            </shadow>
        </value>
        <value name="STEPLEN">
            <shadow type="math_number">
                <field name="NUM">50</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_standStraight" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_turn" >
        <value name="STEPS">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="SIDE">
            <field name="SIDE">left</field>
        </value>
    </block>

    <block type="mv2_walk_fw" >
        <value name="STEPS">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_walk_bw" >
        <value name="STEPS">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_walk" >
        <value name="STEPS">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name ="STEPLEN">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name ="TURN">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_wave" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="SIDE">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>

    <block type="mv2_wiggle" />

    <block type="mv2_gripperArmBasic" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="HAND_POSITION">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>

    <block type="mv2_gripperArmTimed" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="HAND_POSITION">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>

    <block type="mv2_stop" >
        <value name="STOP_TYPE">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>

    <block type="mv2_pause" />
    <block type="mv2_resume" />

    `;
}

export function MartyBlocksToolbox_disco() {
  return `
    <block type="mv2_discoChangeBlockPattern" >
        <value>
            <field name="BOARDTYPE"></field>
        </value>
        <value>
            <field name="PROGRAM"></field>
        </value>
    </block>

    <block type="mv2_LEDEyesColour" >  
        <value>
            <field name="BOARDTYPE"></field>
        </value>
        <value name="COLOUR_LED_EYES">
            <shadow type="colour_picker"/>
        </value>
    </block>

    <block type="mv2_LEDEyesColour_SpecificLED" >
        <value>
            <field name="BOARDTYPE"></field>
        </value>
        <value name="LED_POSITION">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="COLOUR_LED_EYES">
            <shadow type="colour_picker"/>
        </value>
    </block>

    <block type="mv2_LEDEyesColourLEDs" >
        <value>
            <field name="SIDE"></field>
        </value>
        <value name="COLOUR_LED_EYES">
            <shadow type="colour_picker_LED_eyes" />
        </value>
    </block>

    <block type="mv2_turnAllLEDsOff" />

    <block type="mv2_RGBOperator">
      <value name="NUM_R">
        <shadow type="math_number">
          <field name="NUM">255</field>
        </shadow>
      </value>
      <value name="NUM_G">
        <shadow type="math_number">
          <field name="NUM">255</field>
        </shadow>
      </value>
      <value name="NUM_B">
        <shadow type="math_number">
          <field name="NUM">255</field>
        </shadow>
      </value>
    </block>

    <block type="mv2_HSLOperator">
      <value name="NUM_H">
        <shadow type="math_number">
          <field name="NUM">360</field>
        </shadow>
      </value>
      <value name="NUM_S">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
      <value name="NUM_L">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>

    <block type="mv2_discoChangeBackColour" >
        <value name="COLOR">
            <shadow type="colour_picker"/>
        </value>
    </block>

    <block type="mv2_discoSetBreatheBackColour" >
        <value name="COLOR">
            <shadow type="colour_picker"/>
        </value>
        <value name="MILLISECONDS">
            <shadow type="math_number">
                <field name="NUM">1000</field>
            </shadow>
        </value>
    </block>
    
    <block type="mv2_discoTurnOffBackColour" />

    <block type="mv2_discoChangeRegionColour" >
        <value>
            <field name="BOARDTYPE"></field>
        </value>
        <value name="COLOR">
            <shadow type="colour_picker"/>
        </value>
        <value>
            <field name="REGION"></field>
        </value>
    </block>
    `;
}

export function MartyBlocksToolbox_sound(soundName) {
  return `
        <!--Marty blocks-->


        <block type="mv2_playSoundUntilDone" >
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu">
                    <field name="SOUND_MENU">${soundName}</field>
                </shadow>
            </value>
        </block>

        <block type="mv2_playNote" >
            <value name="NOTES_MENU">
                <field name="NOTES_MENU"></field>
            </value>
        </block>
        <block type="mv2_playTone" >
            <value name="HZ1">
                <shadow type="math_number">
                    <field name="NUM">200</field>
                </shadow>
            </value>
            <value name="HZ2">
                <shadow type="math_number">
                    <field name="NUM">300</field>
                </shadow>
            </value>
            <value name="SECONDS">
                <shadow type="math_number">
                    <field name="NUM">3</field>
                </shadow>
            </value>
        </block>
        <block type="mv2_stopSounds" />

        <block type="mv2_playSound" >
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu">
                    <field name="SOUND_MENU">${soundName}</field>
                </shadow>
            </value>
        </block>
        
        <block type="mv2_changePitchEffect" >
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>

        <block type="mv2_setPitchEffect" >
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>

        <block type="mv2_clearSoundEffects" />

        <block type="mv2_changeVolume" >
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">-10</field>
                </shadow>
            </value>
        </block>

        <block type="mv2_setVolume" >
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
    `;
}

export function MartyBlocksToolbox_sensing() {
  return `
    <block type="XAxisMovement" />
    <block type="YAxisMovement" />
    <block type="ZAxisMovement" />

    <block type="XAxisMagnetometer" />
    <block type="YAxisMagnetometer" />
    <block type="ZAxisMagnetometer" />

    <block type="BatteryPercentage" />

    <block type="ServoCurrent" >
        <value>
            <field name="SERVOCHOICE"></field>
        </value>
    </block>

    <block type="ServoPosition" >
        <value>
            <field name="SERVOCHOICE"></field>
        </value>
    </block>

    <block type="mv2_obstaclesense" />

    <block type="mv2_groundsense" />

    <block type="mv2_coloursense" />
    
    <block type="mv2_coloursense_hex" />

    <block type="mv2_coloursenseraw" />

    <block type="mv2_distancesense" />

    <block type="mv2_lightsense" />

    <block type="mv2_noisesense" />
    `;
}
