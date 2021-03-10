import { Run } from '../../../interfaces/Command';
import mongoose from 'mongoose';
import { MessageAttachment, MessageEmbed } from 'discord.js';
import Colors from '../../../util/Colors';
import ytdl from 'ytdl-core';

export const run: Run = async (client, message, args, prefix) => {};

export const name: string = 'play';
export const category: string = 'music';
export const desc: string = 'Play some music.';
