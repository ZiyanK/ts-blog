import * as express from "express";

import Article from "../models/article";
import { IArticle } from "../interfaces/article.interface";

const createArticle = async (req: express.Request, res: express.Response) => {
	try {
		const article:IArticle = new Article({
			...req.body,
			author: req.body.userObject._id
		});
		await article.save()
		res.status(201).send({'article':article});
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const getMyArticles = async (req: express.Request, res: express.Response) => {
	try {
		const articles = await Article.find({author: req.body.userObject._id})
		res.status(200).send(articles);
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const getArticle = async (req: express.Request, res: express.Response) => {
	try {
		const articles = await Article.find({_id: req.params.id}).select('_id tags title description content').populate('author', 'name')
		res.status(200).send(articles);
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const updateArticle = async (req: express.Request, res: express.Response) => {
	try {
		const updatedArticle: IArticle = await Article.findOneAndUpdate({ $and: [{_id: req.params.id}, {author: req.body.userObject._id}] }, {
			title: req.body.title,
			description: req.body.description,
			content: req.body.content
		})
		if(updatedArticle !== null) {
			res.status(200).send("Updated");
		} else {
			res.status(400).send("Bad request");
		}
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const deleteArticle = async (req: express.Request, res: express.Response) => {
	try {
		const deletedArticle: IArticle = await Article.findOneAndDelete({ $and: [{_id: req.params.id}, {author: req.body.userObject._id}] });
		if(deletedArticle !== null) {
			res.status(200).send("Deleted");
		} else {
			res.status(400).send("Bad request");
		}
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const getAllArticles = async (req: express.Request, res: express.Response) => {
	try {
		const queries = req.query;
		const articles = await Article.find(queries).select('title tags author').populate('author', 'name -_id')
		res.status(200).send(articles);
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const _ = {
	createArticle,
	getMyArticles,
	getArticle,
	updateArticle,
	deleteArticle,
	getAllArticles,
}

export default _;