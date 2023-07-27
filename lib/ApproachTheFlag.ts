import ActionNode from "./BaseClasses/ActionNode";
import { NodeStatus } from "./BaseClasses/NodeStatus";

import { RGBot } from "rg-bot";
import { Item } from "prismarine-item";
import { Block } from "prismarine-block";
import { Entity } from "prismarine-entity";

export default class ApproachTheFlag extends ActionNode {

        constructor() {
            super("Approach the flag");
        }

       /**
        * Generated from prompt:
        * Approach the flag
        */
	public override async execute(): Promise<NodeStatus> {
		return NodeStatus.SUCCESS;
	}
}