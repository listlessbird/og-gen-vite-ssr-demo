import satori from "satori";
import fs from "node:fs/promises";
import path from "path";
import React from "react";

export async function getOg({
  title = "Welcome to my blog",
  description = "A place where I share my thoughts",
}) {
  const fontPath = path.join(process.cwd(), "server", "Montserrat-Regular.ttf");
  const fontBuffer = await fs.readFile(fontPath);
  
  const svg = await satori(
    <div style={{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Montserrat',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1100px',
        height: '530px',
        padding: '30px',
        border: '10px solid #ff356f',
        borderRadius: '20px',
        backgroundColor: '#ffffff',
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#333333',
          textAlign: 'center',
          marginBottom: '20px',
          maxWidth: '900px',
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: '24px',
          color: '#666666',
          textAlign: 'center',
          maxWidth: '800px',
        }}>
          {description}
        </p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Montserrat",
          data: fontBuffer,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
  return svg;
}

export async function getBlogPostOg({ title, author, date, content, imageUrl }) {
  const fontPath = path.join(process.cwd(), "server", "Montserrat-Regular.ttf");
  const fontPathBold = path.join(process.cwd(), "server", "Montserrat-Bold.ttf");
  const fontBufferNormal = await fs.readFile(fontPath);
  const fontBufferBold = await fs.readFile(fontPathBold); 
  console.log(content.length)
  const contentSnippet = content.length > 100 ? content.substring(0, 70) + '...' : content;
  console.log(contentSnippet)
 const svg = await satori(
    <div style={{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: '40px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <img 
          src="https://avatar.iran.liara.run/public" 
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '25px',
            marginRight: '15px',
          }} 
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#333', 
            margin: '0'
          }}>
            {author}
          </p>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            margin: '0'
          }}>
            {date}
          </p>
        </div>
      </div>

      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '20px',
        maxWidth: '90%',
      }}>
        {title}
      </h1>

      <p style={{
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
        // maxWidth: '90%',
      }}>
        {contentSnippet}
      </p>

      {imageUrl && (
        <img 
          src={imageUrl} 
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '10px',
          }} 
        />
      )}

      <div style={{
        marginTop: 'auto',
        borderTop: '2px solid #eaeaea',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ 
          fontSize: '18px', 
          color: '#666' 
        }}>
          Read more on my blog
        </p>
        <p style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: '#ff356f' 
        }}>
          blog.listless.dev
        </p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Montserrat",
          data: fontBufferNormal,
          weight: 400,
          style: "normal",
        },
        {
          name: "Montserrat",
          data: fontBufferBold,
          weight: 700,
          style: "bold",
        }
      ],
    }
  );
  
  return svg;
}
