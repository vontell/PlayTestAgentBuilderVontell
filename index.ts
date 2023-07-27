// Bot dependencies
import { RGBot } from 'rg-bot';
import RGCTFUtils, { CTFEvent } from 'rg-ctf-utils';
import { Vec3 } from 'vec3';
import { Item } from 'prismarine-item';
import { Entity } from 'prismarine-entity';
import { Block } from 'prismarine-block';
const armorManager = require('mineflayer-armor-manager')

// Base Class Nodes
import { NodeStatus } from "./lib/BaseClasses/NodeStatus";
import Node from "./lib/BaseClasses/Node";
import RootNode from './lib/BaseClasses/RootNode';
import SequenceNode  from './lib/BaseClasses/SequenceNode';
import SelectorNode from './lib/BaseClasses/SelectorNode';
import ConditionNode from './lib/BaseClasses/ConditionNode';
import ActionNode from './lib/BaseClasses/ActionNode';
// Decorators
import AlwaysSucceed from './lib/BaseClasses/Decorators/AlwaysSucceed';
import AlwaysFail from './lib/BaseClasses/Decorators/AlwaysFail';
import Invert from './lib/BaseClasses/Decorators/Invert';

// Generated Nodes
import ReturnAFlagIfIHaveOne from './lib/ReturnAFlagIfIHaveOne';
import ApproachTheFlag from './lib/ApproachTheFlag';
import AttackEnemiesThatAreNearTheFlag from './lib/AttackEnemiesThatAreNearTheFlag';
import CaptureTheFlag from './lib/CaptureTheFlag';
import CollectNearbyItems from './lib/CollectNearbyItems';
import AttackNearbyEnemies from './lib/AttackNearbyEnemies';

// Reference to root not
let rootNode: RootNode;

export function configureBot(bot: RGBot) {

    bot.setDebug(false)
    bot.allowParkour(true)
    bot.allowDigWhilePathing(true)

    // Load the armor-manager plugin (https://github.com/PrismarineJS/MineflayerArmorManager)
    bot.mineflayer().loadPlugin(armorManager)

    // construct tree
    const attackAndCapture = new SequenceNode("Attack and Capture");
    attackAndCapture.addChild(new AttackEnemiesThatAreNearTheFlag());
    attackAndCapture.addChild(new CaptureTheFlag());

    const offensiveFlagCapture = new SelectorNode("Offensive Flag Capture");
    offensiveFlagCapture.addChild(new ApproachTheFlag());
    offensiveFlagCapture.addChild(attackAndCapture);

    const coreLogic = new SelectorNode("Core Logic");
    coreLogic.addChild(new ReturnAFlagIfIHaveOne());
    coreLogic.addChild(offensiveFlagCapture);
    coreLogic.addChild(new CollectNearbyItems());
    coreLogic.addChild(new AttackNearbyEnemies());

    const topLevelSequenceNode = new SequenceNode("Top Level Sequence Node");
    topLevelSequenceNode.addChild(coreLogic);

    rootNode = new RootNode("Root Node", bot);
    rootNode.addChild(topLevelSequenceNode);

}

export async function runTurn(bot: RGBot) {
    try
    {
        await rootNode.execute();
    }
    catch(err) {
        console.log("Error Executing Tree: ", err)
    }
}