import ActionNode from "./BaseClasses/ActionNode";
import { NodeStatus } from "./BaseClasses/NodeStatus";

import { RGBot } from "rg-bot";
import { Item } from "prismarine-item";
import { Block } from "prismarine-block";
import { Entity } from "prismarine-entity";

export default class CollectNearbyItems extends ActionNode {

        constructor() {
            super("Collect nearby items");
        }

       /**
        * Generated from prompt:
        * Collect nearby items
        */
	public override async execute(): Promise<NodeStatus> {
		const bot = this.getData<RGBot>('bot');
		if (!bot) {
			return NodeStatus.FAILURE;
		}

		const items = await bot.findAndCollectItemsOnGround({maxDistance: 20});
		if (items.length > 0) {
			return NodeStatus.SUCCESS;
		} else {
			return NodeStatus.FAILURE;
		}
	}

}