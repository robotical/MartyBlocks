import ScratchBlocks from 'scratch-blocks';
import targetTypes from "./target-types-enum.js";

const martyblockslib = require('marty-blocks-lib');

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

/* eslint-disable no-unused-vars */
const motion = function (isInitialSetup, targetType, targetId, raftType) {
    const stageSelected = ScratchBlocks.ScratchMsgs.translate(
        'MOTION_STAGE_SELECTED',
        'Stage selected: no motion blocks'
    );

    const stageMotionBlocks = targetType === targetTypes.stage ? `<label text="${stageSelected}"></label>` : '';
    const martyMotionBlocks = (targetType === targetTypes.device && raftType === "Marty") ? martyblockslib.MartyBlocksToolbox_motion() : '';
    const cogMotionBlocks = (targetType === targetTypes.device && raftType === "Cog") ? martyblockslib.CogBlocksToolbox_motion() : '';
    const spriteMotionBlocks = targetType === targetTypes.sprite ? `
    <block type="motion_movesteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_goto">
            <value name="TO">
                <shadow type="motion_goto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_gotoxy">
            <value name="X">
                <shadow id="movex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="movey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_glideto" id="motion_glideto">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="motion_glideto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_glidesecstoxy">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="X">
                <shadow id="glidex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="glidey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_pointindirection">
            <value name="DIRECTION">
                <shadow type="math_angle">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        <block type="motion_pointtowards">
            <value name="TOWARDS">
                <shadow type="motion_pointtowards_menu">
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_changexby">
            <value name="DX">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_setx">
            <value name="X">
                <shadow id="setx" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_changeyby">
            <value name="DY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_sety">
            <value name="Y">
                <shadow id="sety" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="motion_ifonedgebounce"/>
        ${blockSeparator}
        <block type="motion_setrotationstyle"/>
        ${blockSeparator}
        <block id="${targetId}_xposition" type="motion_xposition"/>
        <block id="${targetId}_yposition" type="motion_yposition"/>
        <block id="${targetId}_direction" type="motion_direction"/>
` : '';

    return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">
        ${stageMotionBlocks}
        ${martyMotionBlocks}
        ${cogMotionBlocks}
        ${blockSeparator}
        ${spriteMotionBlocks}
        ${categorySeparator}
    </category>
    `;
};

const xmlEscape = function (unsafe) {
    return unsafe.replace(/[<>&'"]/g, c => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
};

const looks = function (isInitialSetup, targetType, targetId, costumeName, backdropName, raftType) {
    const hello = ScratchBlocks.ScratchMsgs.translate('LOOKS_HELLO', 'Hello!');
    const hmm = ScratchBlocks.ScratchMsgs.translate('LOOKS_HMM', 'Hmm...');

    const stageLooksBlocks = targetType === targetTypes.stage ? `
    <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_switchbackdroptoandwait">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
    <block type="looks_nextbackdrop"/>
    ${blockSeparator}
    <block id="backdropnumbername" type="looks_backdropnumbername"/>
    <block type="looks_changeeffectby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
        </block>
        <block type="looks_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_cleargraphiceffects"/>
    ` : '';
    const spriteLooksBlocks = targetType === targetTypes.sprite ? `
    <block type="looks_sayforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hello}</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_say">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hello}</field>
                </shadow>
            </value>
        </block>
        <block type="looks_thinkforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hmm}</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_think">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">${hmm}</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block id="${targetId}_switchcostumeto" type="looks_switchcostumeto">
                <value name="COSTUME">
                    <shadow type="looks_costume">
                        <field name="COSTUME">${costumeName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextcostume"/>
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextbackdrop"/>
            ${blockSeparator}
            <block type="looks_changesizeby">
                <value name="CHANGE">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_setsizeto">
                <value name="SIZE">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
    </block>
        ${blockSeparator}
            <block type="looks_show"/>
            <block type="looks_hide"/>
        ${blockSeparator}
            <block type="looks_gotofrontback"/>
            <block type="looks_goforwardbackwardlayers">
                <value name="NUM">
                    <shadow type="math_integer">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            ${blockSeparator}
            <block id="${targetId}_costumenumbername" type="looks_costumenumbername"/>
            <block id="backdropnumbername" type="looks_backdropnumbername"/>
            <block id="${targetId}_size" type="looks_size"/>
            <block type="looks_changeeffectby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
        </block>
        <block type="looks_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_cleargraphiceffects"/>
    ` : '';
    const martyLooksBlocks = (targetType === targetTypes.device && raftType === "Marty") ? martyblockslib.MartyBlocksToolbox_disco() : '';
    const cogLooksBlocks = (targetType === targetTypes.device && raftType === "Cog") ? martyblockslib.CogBlocksToolbox_looks() : '';
    return `
    <category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#9966FF" secondaryColour="#774DCB">
    ${stageLooksBlocks}
    ${martyLooksBlocks}
    ${cogLooksBlocks}
    ${spriteLooksBlocks}
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
    ${categorySeparator}
    </category>
    `;
};

const sound = function (isInitialSetup, targetType, targetId, soundName, raftType) {
    const spriteSoundBlocks = targetType === targetTypes.sprite ? `
            <block id="${targetId}_sound_playuntildone" type="sound_playuntildone">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu">
                    <field name="SOUND_MENU">${soundName}</field>
                </shadow>
            </value>
        </block>
        <block id="${targetId}_sound_play" type="sound_play">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu">
                    <field name="SOUND_MENU">${soundName}</field>
                </shadow>
            </value>
        </block>
        <block type="sound_stopallsounds"/>
        ${blockSeparator}
        <block type="sound_changeeffectby">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="sound_cleareffects"/>
        ${blockSeparator}
        <block type="sound_changevolumeby">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">-10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_setvolumeto">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block id="${targetId}_volume" type="sound_volume"/>
        ` : '';
    const stageSoundBlocks = targetType === targetTypes.stage ? `
    <block id="${targetId}_sound_playuntildone" type="sound_playuntildone">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu">
                    <field name="SOUND_MENU">${soundName}</field>
                </shadow>
            </value>
        </block>
        <block id="${targetId}_sound_play" type="sound_play">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu">
                    <field name="SOUND_MENU">${soundName}</field>
                </shadow>
            </value>
        </block>
        <block type="sound_stopallsounds"/>
        ${blockSeparator}
        <block type="sound_changeeffectby">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="sound_cleareffects"/>
        ${blockSeparator}
        <block type="sound_changevolumeby">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">-10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_setvolumeto">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block id="${targetId}_volume" type="sound_volume"/>
    ` : '';
    const martySoundBlocks = (targetType === targetTypes.device && raftType === "Marty") ? martyblockslib.MartyBlocksToolbox_sound(soundName) : '';
    const cogSoundBlocks = (targetType === targetTypes.device && raftType === "Cog") ? martyblockslib.CogBlocksToolbox_sound() : '';
    return `
    <category name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#D65CD6" secondaryColour="#BD42BD">
        ${martySoundBlocks}
        ${cogSoundBlocks}
        ${blockSeparator}
        ${stageSoundBlocks}
        ${spriteSoundBlocks}
        <block type="nearest_note">
            <value name="FREQUENCY">
                <shadow type="math_number">
                    <field name="NUM">440</field>
                </shadow>
            </value>
        </block>
        ${categorySeparator}
    </category>
    `;
};

const events = function (isInitialSetup, targetType, raftType) {
    const cogBlocksEvents = (targetType === targetTypes.device && raftType === "Cog") ? martyblockslib.CogBlocksToolbox_events() : '';
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
        <block type="event_whenflagclicked"/>
        <block type="event_whenkeypressed">
        </block>
        ${targetType === targetTypes.stage ? `
            <block type="event_whenstageclicked"/>
        ` : `
            <block type="event_whenthisspriteclicked"/>
        `}
        <block type="event_whenbackdropswitchesto">
        </block>
        ${blockSeparator}
        <block type="event_whengreaterthan">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="event_whenbroadcastreceived">
        </block>
        <block type="event_broadcast">
            <value name="BROADCAST_INPUT">
                <shadow type="event_broadcast_menu"></shadow>
            </value>
        </block>
        <block type="event_broadcastandwait">
            <value name="BROADCAST_INPUT">
              <shadow type="event_broadcast_menu"></shadow>
            </value>
        </block>
        ${blockSeparator}
        ${cogBlocksEvents}
        ${categorySeparator}
    </category>
    `;
};

const control = function (isInitialSetup, targetType, raftType) {
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_positive_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block id="forever" type="control_forever"/>
        ${blockSeparator}
        <block type="control_if"/>
        <block type="control_if_else"/>
        <block id="wait_until" type="control_wait_until"/>
        <block id="repeat_until" type="control_repeat_until"/>
        ${blockSeparator}
        <block type="control_stop"/>
        ${blockSeparator}
        ${targetType === targetTypes.stage ? `
            <block type="control_create_clone_of">
                <value name="CLONE_OPTION">
                    <shadow type="control_create_clone_of_menu"/>
                </value>
            </block>
        ` : `
            <block type="control_start_as_clone"/>
            <block type="control_create_clone_of">
                <value name="CLONE_OPTION">
                    <shadow type="control_create_clone_of_menu"/>
                </value>
            </block>
            <block type="control_delete_this_clone"/>
        `}
        ${categorySeparator}
    </category>
    `;
};

const sensing = function (isInitialSetup, targetType, targetId, raftType) {
    const name = ScratchBlocks.ScratchMsgs.translate('SENSING_ASK_TEXT', 'What\'s your name?');

    const sharedSensingBlocks = `
    ${blockSeparator}
    <block type="sensing_keypressed">
    <value name="KEY_OPTION">
        <shadow type="sensing_keyoptions"/>
    </value>
    </block>
    <block type="sensing_mousedown"/>
    <block type="sensing_mousex"/>
    <block type="sensing_mousey"/>

    ${blockSeparator}
    
    <block id="loudness" type="sensing_loudness" />
    ${blockSeparator}
    <block id="timer" type="sensing_timer"/>
    <block type="sensing_resettimer"/>
    ${blockSeparator}
    <block id="of" type="sensing_of">
    <value name="OBJECT">
    <shadow id="sensing_of_object_menu" type="sensing_of_object_menu" />
    </value>
    </block>
    ${blockSeparator}
    <block id="current" type="sensing_current"/>
    <block type="sensing_dayssince2000"/>
    ${blockSeparator}
`;

    const stageSensingBlocks = targetType === targetTypes.stage ? `
     ${isInitialSetup ? '' : `
            <block id="askandwait" type="sensing_askandwait">
                <value name="QUESTION">
                    <shadow type="text">
                        <field name="TEXT">${name}</field>
                    </shadow>
                </value>
            </block>
        `}

<block id="answer" type="sensing_answer" />
${blockSeparator}
<block type="sensing_keypressed">
    <value name="KEY_OPTION">
        <shadow type="sensing_keyoptions"/>
    </value>
</block>
<block type="sensing_mousedown"/>
<block type="sensing_mousex"/>
<block type="sensing_mousey"/>

${blockSeparator}
  
<block id="loudness" type="sensing_loudness" />
${blockSeparator}
<block id="timer" type="sensing_timer"/>
<block type="sensing_resettimer"/>
${blockSeparator}
<block id="of" type="sensing_of">
<value name="OBJECT">
<shadow id="sensing_of_object_menu" type="sensing_of_object_menu" />
</value>
</block>
${blockSeparator}
<block id="current" type="sensing_current"/>
<block type="sensing_dayssince2000"/>
${blockSeparator}
<block type="sensing_username" />
    ` : ``;
    const spriteSensingBlocks = targetType === targetTypes.sprite ? `
    <block type="sensing_touchingobject">
                <value name="TOUCHINGOBJECTMENU">
                    <shadow type="sensing_touchingobjectmenu"/>
                </value>
            </block>
            <block type="sensing_touchingcolor">
                <value name="COLOR">
                    <shadow type="colour_picker"/>
                </value>
            </block>
            <block type="sensing_coloristouchingcolor">
                <value name="COLOR">
                    <shadow type="colour_picker"/>
                </value>
                <value name="COLOR2">
                    <shadow type="colour_picker"/>
                </value>
            </block>
            <block type="sensing_distanceto">
                <value name="DISTANCETOMENU">
                    <shadow type="sensing_distancetomenu"/>
                </value>
            </block>
            <block type="sensing_setdragmode" id="sensing_setdragmode"></block>
            ${blockSeparator}
             ${isInitialSetup ? '' : `
            <block id="askandwait" type="sensing_askandwait">
                <value name="QUESTION">
                    <shadow type="text">
                        <field name="TEXT">${name}</field>
                    </shadow>
                </value>
            </block>
        `}

<block id="answer" type="sensing_answer" />
${sharedSensingBlocks}
<block type="sensing_username" />
    ` : ``;
    const martySensingBlocks = (targetType === targetTypes.device && raftType === "Marty") ? `${martyblockslib.MartyBlocksToolbox_sensing()} ${sharedSensingBlocks}` : ``;
    const cogSensingBlocks = (targetType === targetTypes.device && raftType === "Cog") ? `${martyblockslib.CogBlocksToolbox_sensing()} ${sharedSensingBlocks}` : ``;
    return `
    <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
            ${stageSensingBlocks}
            ${martySensingBlocks}
            ${cogSensingBlocks}
            ${blockSeparator}
            ${spriteSensingBlocks}
            ${categorySeparator}
    </category >
    `;
};

const operators = function (isInitialSetup) {
    const apple = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_APPLE', 'apple');
    const banana = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_BANANA', 'banana');
    const letter = ScratchBlocks.ScratchMsgs.translate('OPERATORS_LETTEROF_APPLE', 'a');
    return `
    <category name="%{BKY_CATEGORY_OPERATORS}" id="operators" colour="#40BF4A" secondaryColour="#389438">

        <block type="operator_add">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_subtract">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_multiply">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_divide">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
<block type="operator_random">
    <value name="FROM">
        <shadow type="math_number">
            <field name="NUM">1</field>
        </shadow>
    </value>
    <value name="TO">
        <shadow type="math_number">
            <field name="NUM">10</field>
        </shadow>
    </value>
</block>
        ${blockSeparator}
        <block type="operator_gt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="operator_and"/>
        <block type="operator_or"/>
        <block type="operator_not"/>
        ${blockSeparator}
        ${isInitialSetup ? '' : `
            <block type="operator_join">
                <value name="STRING1">
                    <shadow type="text">
                        <field name="TEXT">${apple} </field>
                    </shadow>
                </value>
                <value name="STRING2">
                    <shadow type="text">
                        <field name="TEXT">${banana}</field>
                    </shadow>
                </value>
            </block>
            <block type="operator_letter_of">
                <value name="LETTER">
                    <shadow type="math_whole_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="STRING">
                    <shadow type="text">
                        <field name="TEXT">${apple}</field>
                    </shadow>
                </value>
            </block>
            <block type="operator_length">
                <value name="STRING">
                    <shadow type="text">
                        <field name="TEXT">${apple}</field>
                    </shadow>
                </value>
            </block>
            <block type="operator_contains" id="operator_contains">
              <value name="STRING1">
                <shadow type="text">
                  <field name="TEXT">${apple}</field>
                </shadow>
              </value>
              <value name="STRING2">
                <shadow type="text">
                  <field name="TEXT">${letter}</field>
                </shadow>
              </value>
            </block>
        `}
        ${blockSeparator}
        <block type="operator_mod">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_round">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
<block type="operator_mathop">
    <value name="NUM">
        <shadow type="math_number">
            <field name="NUM" />
        </shadow>
    </value>
</block>
        ${categorySeparator}
    </category >
    `;
};

const variables = function () {
    return `
    <category name="%{BKY_CATEGORY_VARIABLES}" id="variables" colour="#FF8C1A" secondaryColour="#DB6E00" custom="VARIABLE">
    </category>
    `;
};

const myBlocks = function () {
    return `
 <category name="%{BKY_CATEGORY_MYBLOCKS}" id="myBlocks" colour="#FF6680" secondaryColour="#FF4D6A" custom="PROCEDURE">
 </category>
    `;
};
/* eslint-enable no-unused-vars */

const xmlOpen = '<xml style="display: none">';
const xmlClose = '</xml>';

/**
 * @param {!boolean} isInitialSetup - Whether the toolbox is for initial setup. If the mode is "initial setup",
 * blocks with localized default parameters (e.g. ask and wait) should not be loaded. (LLK/scratch-gui#5445)
 * @param {?boolean} targetType - Whether the toolbox is for a stage-type target. This is always set to true
 * when isInitialSetup is true.
 * @param {?string} targetId - The current editing target
 * @param {?Array.<object>} categoriesXML - optional array of `{ id, xml } ` for categories. This can include both core
 * and other extensions: core extensions will be placed in the normal Scratch order; others will go at the bottom.
 * @property {string} id - the extension / category ID.
 * @property {string} xml - the `< category >...</category > ` XML for this extension / category.
 * @param {?string} costumeName - The name of the default selected costume dropdown.
 * @param {?string} backdropName - The name of the default selected backdrop dropdown.
 * @param {?string} soundName -  The name of the default selected sound dropdown.
 * @returns {string} - a ScratchBlocks-style XML document for the contents of the toolbox.
 */
const makeToolboxXML = function (isInitialSetup, targetType = true, targetId, categoriesXML = [],
    costumeName = '', backdropName = '', soundName = '', raftType = '') {
    try {

        targetType = isInitialSetup || targetType;
        const gap = [categorySeparator];

        costumeName = xmlEscape(costumeName);
        backdropName = xmlEscape(backdropName);
        soundName = xmlEscape(soundName);

        categoriesXML = categoriesXML.slice();
        const moveCategory = categoryId => {
            const index = categoriesXML.findIndex(categoryInfo => categoryInfo.id === categoryId);
            if (index >= 0) {
                // remove the category from categoriesXML and return its XML
                const [categoryInfo] = categoriesXML.splice(index, 1);
                return categoryInfo.xml;
            }
            // return `undefined`
        };

        let motionXML = moveCategory('motion') || motion(isInitialSetup, targetType, targetId, raftType);
        let looksXML = moveCategory('looks') || looks(isInitialSetup, targetType, targetId, costumeName, backdropName, raftType);
        let soundXML = moveCategory('sound') || sound(isInitialSetup, targetType, targetId, soundName, raftType);
        let eventsXML = moveCategory('event') || events(isInitialSetup, targetType, raftType);
        let controlXML = moveCategory('control') || control(isInitialSetup, targetType, raftType);
        let sensingXML = moveCategory('sensing') || sensing(isInitialSetup, targetType, targetId, raftType);
        let operatorsXML = moveCategory('operators') || operators(isInitialSetup);
        let variablesXML = moveCategory('data') || variables();
        let myBlocksXML = moveCategory('procedures') || myBlocks();

        motionXML = (targetType === targetTypes.stage || raftType === "Cog") ? '' : motionXML;

        const everything = [
            xmlOpen,
            motionXML, gap,
            looksXML, gap,
            soundXML, gap,
            eventsXML, gap,
            controlXML, gap,
            sensingXML, gap,
            operatorsXML, gap,
            variablesXML, gap,
            myBlocksXML
        ];

        for (const extensionCategory of categoriesXML) {
            if (targetType === targetTypes.stage) {
                // no extensions for the stage
                continue;
            }
            if (targetType === targetTypes.sprite) {
                // everything for the sprite
                everything.push(gap, extensionCategory.xml);
            }
            if (raftType === "Cog") {
                // no text2speech or translate for cog
                if (
                    extensionCategory.id === 'text2speech' ||
                    extensionCategory.id === 'translate'
                ) {
                    continue;
                }
                everything.push(gap, extensionCategory.xml);
            }
            if (raftType === "Marty") {
                everything.push(gap, extensionCategory.xml);
            }

        }

        everything.push(xmlClose);
        return everything.join('\n');
    }
    catch (e) {
        console.error("Error in makeToolboxXML", e);
        throw e;
    }
};

export default makeToolboxXML;
