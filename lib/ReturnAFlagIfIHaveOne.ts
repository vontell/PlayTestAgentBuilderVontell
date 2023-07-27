import ActionNode from "./BaseClasses/ActionNode";
import { NodeStatus } from "./BaseClasses/NodeStatus";

import { RGBot } from "rg-bot";
import { Item } from "prismarine-item";
import { Block } from "prismarine-block";
import { Entity } from "prismarine-entity";

export default class ReturnAFlagIfIHaveOne extends ActionNode {

        constructor() {
            super("Return a flag if I have one");
        }

       /**
        * Generated from prompt:
        * Return a flag to my base if I have it in my inventory
        */
	public override async execute(): Promise<NodeStatus> {
		const bot = this.getData<RGBot>('bot');
		if (!bot) {
			return NodeStatus.FAILURE;
		}

		// Check if the bot has a flag in its inventory
		if (!bot.inventoryContainsItem('flag')) {
			return NodeStatus.FAILURE;
		}

		// Find the base block
		const baseBlock = bot.findBlock('base', { partialMatch: true, maxDistance: 1000, originPoint: bot.position() });
		if (!baseBlock) {
			return NodeStatus.FAILURE;
		}

		// Approach the base block
		const approachResult = await bot.approachBlock(baseBlock, { reach: 1 });
		if (!approachResult) {
			return NodeStatus.RUNNING;
		}

		// Drop the flag
		await bot.dropInventoryItem('flag', { partialMatch: true, quantity: 1 });

		return NodeStatus.SUCCESS;
	}

}