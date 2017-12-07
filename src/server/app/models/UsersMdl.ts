/**
 *
 *  USERS ADMIN INTERFACE
 *  Users model file.
 *
 *  Model for users entity
 *
 */

import * as fs from "fs";
import * as csvjson from "csvjson";
import * as lodash from "lodash";
import {InternalServerError, NotFoundError, BadRequestError} from "routing-controllers";

import {config} from "../config";

export interface User {
    id: number;
    name: string;
    avatarUrl: string;
}

export class UsersMdl {
    private users: User[] = [];
    private page: number = 1;
    private limit: number;
    private allUsersAmount: number = 100; // by default will be 100

    public getAll(page: number,
                  limit: number): Promise<User[]> {
        lodash.forEach({page, limit}, (param, key) => {
            if (!param) {
                throw new BadRequestError(`Bad '${key}' param`);
            }
        });

        if (this.users.length &&
            this.users.length === limit &&
            this.page === page) {
            return Promise.resolve(this.users);
        }

        return new Promise(resolve => {
            fs.readFile(config.pathToCsv, "utf-8", (err, csvData) => {
                if (err) {
                    throw new InternalServerError("Reading data file error");
                }

                try {
                    this.users = csvjson.toObject(csvData, {
                        delimiter: ","
                    });
                } catch (e) {
                    throw new InternalServerError("Reading users data error");
                }

                this.allUsersAmount = this.users.length;

                // pagination
                const startPosition: number = (page - 1) * limit;
                const endPosition: number = startPosition + limit;

                this.users = this.users
                    .slice(startPosition, endPosition)
                    .map(item => Object.assign(item, {id: +item.id})); // convert string ids to number

                this.page = page;
                this.limit = limit;

                resolve(this.users);
            });
        });
    }

    public async getOne(id: number | null): Promise<User> {
        if (!id) {
            throw new BadRequestError("Bad 'id' param");
        }

        if (!this.users.length) {
            await this.getAll(1, this.allUsersAmount); // this code only useful in this case, not for DB
        }

        const user: User | undefined = lodash.find(this.users, {id});
        if (!user) {
            throw new NotFoundError("User was not found");
        }

        return Promise.resolve(user);
    }

    public async save(id: number | null,
                      user: User | null): Promise<User | {}> {
        lodash.forEach({id, user}, (param, key) => {
            if (!param) {
                throw new BadRequestError(`Bad '${key}' param`);
            }
        });

        await this.getAll(1, this.allUsersAmount); // this code only useful in this case, not for DB

        const index: number = lodash.findIndex(this.users, {id: <number>id});
        if (index === -1) {
            throw new NotFoundError("User was not found");
        }

        this.users[index] = <User>user;

        let csvData: string;
        try {
            csvData = csvjson.toCSV(this.users, {
                headers: "relative"
            });
        } catch (e) {
            throw new InternalServerError("Converting data to csv error");
        }

        return new Promise(resolve => {
            fs.writeFile(config.pathToCsv, csvData, err => {
                if (err) {
                    throw new InternalServerError("Writing data file error");
                }

                resolve(<User>user);
            });
        });
    }
}