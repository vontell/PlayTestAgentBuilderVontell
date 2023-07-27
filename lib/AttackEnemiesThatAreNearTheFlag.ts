import ActionNode from "./BaseClasses/ActionNode";
import { NodeStatus } from "./BaseClasses/NodeStatus";

import { RGBot } from "rg-bot";
import { Item } from "prismarine-item";
import { Block } from "prismarine-block";
import { Entity } from "prismarine-entity";

export default class AttackEnemiesThatAreNearTheFlag extends ActionNode {

        constructor() {
            super("Attack enemies that are near the flag");
        }

       /**
        * Generated from prompt:
        * Attack enemies that are near the flag
        */
	public override async execute(): Promise<NodeStatus> {
		return NodeStatus.SUCCESS;
	}
}