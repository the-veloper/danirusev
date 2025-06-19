import { NextResponse } from 'next/server';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

export async function GET() {
  try {
    // Only allow this endpoint in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ message: 'Endpoint disabled in production' }, { status: 404 });
    }
    
    const s3Client = new S3Client({
      region: process.env.S3_REGION || '',
      endpoint: process.env.S3_ENDPOINT || '',
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
    });

    // Test connection by listing buckets
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    return NextResponse.json({
      success: true,
      buckets: response.Buckets?.map(bucket => bucket.Name) || [],
      s3Config: {
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        bucket: process.env.S3_BUCKET,
        // Don't include credentials in the response
      },
    });
  } catch (error) {
    console.error('S3 test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
} 