<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConfirmationInscription extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $evenement;
    public $user;
    public function __construct($evenement, $user)
    {
        $this->evenement = $evenement;
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('Séne Evens - Confirmation d’inscription')
            ->html("
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f9;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #ffffff;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                color: #333;
                            }
                            .header h2 {
                                color: #4CAF50;
                                font-size: 24px;
                            }
                            .header h3 {
                                color: #333;
                                font-size: 20px;
                                margin-top: 0;
                            }
                            .content {
                                font-size: 16px;
                                color: #555;
                                line-height: 1.6;
                            }
                            .content ul {
                                list-style-type: none;
                                padding-left: 0;
                            }
                            .content li {
                                margin-bottom: 10px;
                            }
                            .btn {
                                display: inline-block;
                                background-color: #007bff;
                                color: #ffffff;
                                padding: 10px 20px;
                                text-decoration: none;
                                border-radius: 5px;
                                text-align: center;
                                margin-top: 20px;
                            }
                            .footer {
                                font-size: 12px;
                                text-align: center;
                                color: #aaa;
                                margin-top: 30px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <div class='header'>
                                <h2>Inscription Réussie ! 🎉</h2>
                                <h3>{$this->evenement->title}</h3>
                            </div>
                            <div class='content'>
                                <p>Félicitations <strong>{$this->user->firstName} {$this->user->lastName}</strong>, vous êtes officiellement inscrit à l'événement <strong>{$this->evenement->titre}</strong> !</p>
                                <p>Voici les détails de l'événement :</p>
                                <ul>
                                    <li><strong>Date :</strong> {$this->evenement->date}</li>
                                    <li><strong>Lieu :</strong> {$this->evenement->location}</li>
                                    <li><strong>Description :</strong> {$this->evenement->description}</li>
                                </ul>
                                <p>Nous avons hâte de vous voir et de passer un super moment ensemble. 🎉</p>
                                <p>Pour plus d'informations, cliquez sur le bouton ci-dessous :</p>
                                <a>+33 564 78 97</a>
                            </div>
                            <div class='footer'>
                                <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
                                <p>Merci pour votre inscription, et à très bientôt !</p>
                            </div>
                        </div>
                    </body>
                </html>
            ");

    }

    /**
     * Get the message envelope.
     */
    //public function envelope(): Envelope
    //{
    //    return new Envelope(
    //        subject: 'Confirmation Inscription',
    //    );
    //}

    /**
     * Get the message content definition.
     */
    //public function content(): Content
    //{
    //    return new Content(
    //        view: 'view.name',
    //    );
    //}

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
