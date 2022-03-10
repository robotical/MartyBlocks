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
                <field></field>
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


    <!-- OLD MARTY MOTION BLOCKS -->

<!--               <block type="mv2_moveLeg">
        <value>
            <field name="SIDE">left</field>
        </value>
        <value>
            <field name="DIRECTION"></field>
        </value>
    </block>-->

    <!--<block type="mv2_stepLeft" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="STEPLENGTH">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="TURN">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_stepRight" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="STEPLENGTH">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="TURN">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_kickLeft" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="TURN">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_kickRight" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="TURN">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_sidestepLeft" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="STEPLENGTH">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_sidestepRight" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
        <value name="STEPLENGTH">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_circleLeft" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_circleRight" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_waveLeft" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
    </block>

    <block type="mv2_waveRight" >
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">5</field>
            </shadow>
        </value>
    </block>
-->
    <!--<block type="mv2_stop" />-->

    <!--<block type="mv2_sidefall" >
        <value name="SIDE">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
        <value name="MOVETIME">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
        <value name="STEPLEN">
            <shadow type="math_number">
                <field name="NUM">2</field>
            </shadow>
        </value>
    </block>-->
    `
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

    <block type="mv2_discoChangeBlockColour" >
        <value>
            <field name="BOARDTYPE"></field>
        </value>
        <value name="COLOR">
            <shadow type="colour_picker"/>
        </value>
    </block>

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
    `
}

export function MartyBlocksToolbox_sound(soundName) {
    return `
        <!--Marty blocks-->

        <block type="mv2_playSound" >
            <value name="SOUND">
                    <field name="SOUND"></field>
            </value>
        </block>
    `
    // return `
    // <!--Marty blocks-->

    // <block type="mv2_playSound" >
    //     <value name="SOUND_MENU">
    //         <shadow type="sound_sounds_menu">
    //             <field name="SOUND_MENU">${soundName}</field>
    //         </shadow>
    //     </value>
    // </block>
    // `
}

export function MartyBlocksToolbox_sensing() {
    return `
    <block type="XAxisMovement" />

    <block type="YAxisMovement" />

    <block type="ZAxisMovement" />

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

    <block type="mv2_coloursenseraw" />

    <block type="mv2_distancesense" />

    <block type="mv2_lightsense" />

    <block type="mv2_noisesense" />

    <!--<block type="mv2_current" />-->

    <!--<block type="mv2_accelerometer" />-->

    <!--<block type="mv2_proximity" />-->

    <!--<block type="mv2_demo_sensor" />-->

    <!--<block type="mv2_set_demo_sensor" >
        <value name="SENSORVAL">
            <shadow type="math_number">
                <field name="NUM">42</field>
            </shadow>
        </value>
    </block>-->
    `
}