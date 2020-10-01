<html>
    <body>
                    
    <?php
        
        //Connect to server.
        $con=mysqli_connect('localhost','id14871382_roshan30', 'Ys]a$kZ!96^~#xYx','id14871382_roshan');
        if(!$con){
            die("Server Connection Failed" . mysqli_error($con));
        }
        
        
        // if(isset($_POST['submit'])){
        
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $message = $_POST['comments'];
        
        $sql = "INSERT INTO Comments(Name, Email_Address, Subject, Message) VALUES ('$name', '$email', '$subject', '$message')";
        $st = mysqli_query($con, $sql);
        if($st)
        {
            echo "<script>alert('Message Sent Successfully');</script>";
        
                
                    $to = "roshanbonde30@gmail.com";
                    
                    $comments = "<h1>Message From Website</h1>";
                    $comments .= "<p><b>From: $name</b></p> \r\n";
                    $comments .= "$message";
                    
                    $header = "From: mywebsite@roshan.com \r\n";
                    
                    $main_sent = mail ($to, $subject, $comments, $header);
                    
                    if( $main_sent == true ) {
                        echo "Mail sent successfully...";
                    } else {
                        echo "Mail could not be sent...";
                    }
            
            $url="index.html";
            echo "<script type=text/javascript>document.location.href='{$url}';</script>";
            echo 'META HTTP-EQUIX="refresh" content="0;URL=' . $url . '">';
        } else {
            echo mysqli_error($con);
        }
        
        // }

    ?>

    </body>
</html>