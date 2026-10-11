#!/usr/bin/env node
import { DeepSFetchClient } from '@deepsfetch/sdk';
import { run } from '../src/cli.js';

process.exitCode = await run(process.argv.slice(2), { Client: DeepSFetchClient });
