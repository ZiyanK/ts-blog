import * as mongoose from "mongoose";

export interface IArticle extends mongoose.Document {
	title: string,
	description: string;
	content: string;
	author: string;
	tags: Array<string>;
	upvotes: Array<string>;
	createdAt: Date;
	modifiedAt: Date;
}