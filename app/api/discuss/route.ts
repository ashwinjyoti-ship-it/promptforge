import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages, productData } = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const systemPrompt = `You are an expert product architect and technical consultant helping a product designer refine their product specifications.

The designer has provided the following product information:
${JSON.stringify(productData, null, 2)}

Your role is to:
1. Ask clarifying questions about ambiguous requirements
2. Identify potential gaps or missing features
3. Suggest improvements and best practices
4. Challenge assumptions constructively
5. Ensure technical feasibility
6. Recommend appropriate tech stack choices

The designer can attach files (images, Excel sheets, PDFs, wireframes, etc.) to provide additional context. When they do:
- For images: Analyze UI/UX designs, wireframes, mockups, or reference designs
- For spreadsheets: Extract database schemas, feature lists, or data structures
- For documents: Review detailed requirements or specifications

Be direct, insightful, and focus on making the product specification robust and complete. When the designer says they're satisfied, acknowledge and prepare for the next phase.`;

    const response = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages
    });

    return NextResponse.json({
      message: response.content[0].type === 'text' ? response.content[0].text : ''
    });
  } catch (error: any) {
    console.error('Claude API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to communicate with Claude' },
      { status: 500 }
    );
  }
}
