/**
 *
 *  USERS ADMIN INTERFACE
 *  Users controller file.
 *
 *  Controller for processing users entity requests
 *
 */

import {Request} from "express";
import {JsonController, Param, Req, Body, Get, Post} from "routing-controllers";

import {UsersMdl} from "../models/UsersMdl.ts";

interface PaginationReqData {
    page: string;
    limit: string;
}

@JsonController()
export class UsersCtrl {
    private usersMdl: UsersMdl;

    constructor() {
        this.usersMdl = new UsersMdl();
    }

    @Get("/users")
    public users(@Req() request: Request) {
        const data: PaginationReqData = request.query;
        return this.usersMdl.getAll(
            (data.page && +data.page) || 0,
            (data.limit && +data.limit) || 0
        );
    }

    @Get("/user/:id")
    public getOne(@Param("id") id: number) {
        return this.usersMdl.getOne(id || null);
    }

    @Post("/user/:id")
    public save(@Body() data: any,
                @Param("id") id: number) {
        return this.usersMdl.save(
            id || null,
            (Object.keys(data).length && data) || null
        );
    }
}