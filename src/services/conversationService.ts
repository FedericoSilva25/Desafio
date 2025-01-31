import { Thread, Message } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class ConversationService {
    private conversations: Map<string, Thread>;

    constructor() {
        this.conversations = new Map();
    }

    createThread(): string {
        const threadId = uuidv4();
        this.conversations.set(threadId, {
            id: threadId,
            messages: [],
            currentAgent: 'destination' // Comenzamos con el experto en destinos
        });
        return threadId;
    }

    addMessage(threadId: string, message: Message): void {
        const thread = this.conversations.get(threadId);
        if (!thread) {
            throw new Error('Hilo de conversación no encontrado');
        }
        thread.messages.push(message);
    }

    getThread(threadId: string): Thread {
        const thread = this.conversations.get(threadId);
        if (!thread) {
            throw new Error('Hilo de conversación no encontrado');
        }
        return thread;
    }

    switchAgent(threadId: string, agent: 'destination' | 'luggage_weather'): void {
        const thread = this.conversations.get(threadId);
        if (!thread) {
            throw new Error('Hilo de conversación no encontrado');
        }
        thread.currentAgent = agent;
    }
}
